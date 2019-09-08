var helper = {};

helper.trimString = (s) => {
    var result = ''
    var cnt = s.length;
    var i = 0;
    while(s[i] == ' '){
        i++;
    }
    result = s.slice(i + 1, s.length - 1);
    return result;
}

helper.normalizeString = (s) => {
    return s.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')
}

helper.randomNumber = (low, high) => {
    return Math.random() * (high - low) + low;
}

var values = ['Health','Health','Music','Dance','Music','Music','Sports','Sports','Games','Health','Reading','Art','Art','Not Available'];
var activities = ['Gym Membership','Yoga','Singing','Dance','Piano','Guitar ','Cricket','Football','Online Gaming',
        'Swimming','Book Reading','Drawing','Painting','Not Available On Social Media'];

helper.generatePsycho = () => {
    return [activities[Math.round(helper.randomNumber(0, activities.length - 1))], values[Math.round(helper.randomNumber(0, values.length - 1))]];
}

helper.getAttribute = (income) => {
    if (income > 1200000)
        return 'High Purchasing Power';
    else if(income > 800000)
        return 'Moderate Purchasing Power';
    else
        return 'Low Purchasing Power';
}

module.exports = helper;