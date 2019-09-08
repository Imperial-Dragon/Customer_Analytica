import math  # For pow and sqrt
from random import shuffle, uniform
import pandas as pd


def ReadData(acc_data, age_data):
    # Read the file, splitting by lines

    accData = {""}

    for i in range(10000):
        accData.add(acc_data["accountNo"][i])

    print("In ReadData, length of accData = " + str(len(acc_data)))

    accData.pop()

    items = []

    for i in range(10000):
        itemFeatures = []
        ratio = acc_data["Current Loan Amount"][i] / acc_data["Annual Income"][i]
        itemFeatures.append(ratio)
        itemFeatures.append(age_data["age"][i])
        itemFeatures.append(i)

        items.append(itemFeatures)

    return items


def FindColMinMax(items):
    n = len(items[0]) - 1
    minimal = [999 for i in range(n)]
    maximal = [-999 for i in range(n)]

    for item in items:
        for f in range(len(item) - 1):
            if item[f] < minimal[f]:
                minimal[f] = item[f]

            if item[f] > maximal[f]:
                maximal[f] = item[f]

    return minimal, maximal


def EuclideanDistance(x, y):
    S = 0  # The sum of the squared differences of the elements
    for i in range(len(x) - 1):
        S += math.pow(x[i] - y[i], 2)

    return math.sqrt(S)  # The square root of the sum


def InitializeMeans(items, k, cMin, cMax):
    f = len(items[0]) - 1  # number of features
    means = [[0 for i in range(f)] for j in range(k)]

    for mean in means:
        for i in range(len(mean)):
            mean[i] = ((cMin[i] + 1) + (cMax[i] - 1)) / 2

    return means


def UpdateMean(n, mean, item):
    for i in range(len(mean)):
        m = mean[i]
        m = (m * (n - 1) + item[i]) / float(n)
        mean[i] = round(m, 3)

    return mean


def FindClusters(means, items):
    clusters = [[] for i in range(len(means))];  # Init clusters

    for item in items:
        # Classify item into a cluster
        index = Classify(means, item)

        # Add item to cluster
        clusters[index].append(item)

    return clusters


###_Core Functions_###
def Classify(means, item):
    minimum = 9999
    index = -1

    for i in range(len(means)):
        dis = EuclideanDistance(item, means[i])

        if dis < minimum:
            minimum = dis
            index = i

    return index


def CalculateMeans(k, items, maxIterations=100000):
    cMin, cMax = FindColMinMax(items)

    means = InitializeMeans(items, k, cMin, cMax)

    clusterSizes = [0 for i in range(len(means))]

    belongsTo = [0 for i in range(len(items))]

    for e in range(maxIterations):
        noChange = True
        for i in range(len(items)):
            item = items[i]

            index = Classify(means, item)

            clusterSizes[index] = clusterSizes[index] + 1
            means[index] = UpdateMean(clusterSizes[index], means[index], item)

            if index != belongsTo[i]:
                noChange = False

            belongsTo[i] = index

        if noChange:
            break

    return means


def sortAccToData(acc_data, age_data, clusters):
    cnt_low = len(clusters[0])
    cnt_mod = len(clusters[1])
    cnt_high = len(clusters[2])

    print(str(cnt_low) + " " + str(cnt_mod) + " " + str(cnt_high))

    for i in range(0, len(clusters[0]) - 1):
        if acc_data["Days since last delinquent"][clusters[0][i][2]] > 10:
            cnt_mod = cnt_mod + 1
            cnt_low = cnt_low - 1
            age_data["Risk Level"][clusters[0][i][2]] = "Moderate"
        else:
            age_data["Risk Level"][clusters[0][i][2]] = "Low"

    for i in range(0, len(clusters[1]) - 1):
        if acc_data["Days since last delinquent"][clusters[1][i][2]] > 10:
            cnt_high = cnt_high + 1
            cnt_mod = cnt_mod - 1
            age_data["Risk Level"][clusters[1][i][2]] = "High"
        elif acc_data["Days since last delinquent"][clusters[1][i][2]] < 3:
            cnt_mod = cnt_mod - 1
            cnt_low = cnt_low + 1
            age_data["Risk Level"][clusters[1][i][2]] = "Low"
        else:
            age_data["Risk Level"][clusters[1][i][2]] = "Moderate"

    for i in range(0, len(clusters[2]) - 1):
        if acc_data["Days since last delinquent"][clusters[2][i][2]] < 3:
            cnt_mod = cnt_mod + 1
            cnt_high = cnt_high - 1
            age_data["Risk Level"][clusters[2][i][2]] = "Moderate"
        else:
            age_data["Risk Level"][clusters[2][i][2]] = "High"

    print(str(cnt_low) + " " + str(cnt_mod) + " " + str(cnt_high))


def main():
    acc_data = pd.read_csv("bc4.csv")
    age_data = pd.read_csv("demographic.csv")

    items = ReadData(acc_data, age_data)

    # k is number of clusters
    k = 3

    means = CalculateMeans(k, items)
    while True:
        if means[0][0] > means[2][0]:
            temp = means[0][0]
            means[0][0] = means[2][0]
            means[2][0] = temp
        elif means[0][0] > means[1][0]:
            temp = means[0][0]
            means[0][0] = means[1][0]
            means[1][0] = temp
        elif means[1][0] > means[2][0]:
            temp = means[1][0]
            means[1][0] = means[2][0]
            means[2][0] = temp
        else:
            break
    clusters = FindClusters(means, items)
    print(means)
    print(clusters)

    sortAccToData(acc_data, age_data, clusters)

    age_data.to_csv("demographic.csv")


if __name__ == "__main__":
    main()
