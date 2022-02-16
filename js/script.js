const button = document.querySelector('.userParams__button');
const output = document.querySelector('.userParams__output-value');
const outputContainer = document.querySelector('.userParams__output');

const user = {};

function getParams () {
    user.height = Math.abs(Number(document.querySelector('.userParams__input-height').value));
    user.weight = Math.abs(Number(document.querySelector('.userParams__input-weight').value));
}

function countUserBMI (height, weight) {
    return (weight / ((height**2)/10000)).toFixed(1);
}

function countWeightByBMI (height, BMI) {
    return (((height**2)/10000)*BMI).toFixed(1);
}

function cutZeroEnding (number) {
    number = String(number);
    if (number[number.length - 1] == 0) {
        number = Math.round(Number(number));
    }
    return number;
}

function countRecommendedWeightRange (height, minBMI, maxBMI, params) {
    params.minWeight = cutZeroEnding(countWeightByBMI(height, minBMI));
    params.maxWeight = cutZeroEnding(countWeightByBMI(height, maxBMI));
}

function adaptRecommendedBMI (userBMI, params) {
    if (userBMI < params.minBMI + 0.5) {
        params.minBMI = params.minBMI - 2;
    }
    if (userBMI > params.maxBMI - 0.5) {
        params.maxBMI = params.maxBMI + 2;
    }
}

button.addEventListener('click', event => {
    const recommendedParams = {
        minBMI: 18.5,
        maxBMI: 25,
    }
    getParams();
    outputContainer.style.display = "block";
    user.BMI = countUserBMI(user.height, user.weight);
    user.BMI = cutZeroEnding(user.BMI);
    adaptRecommendedBMI(user.BMI, recommendedParams);
    countRecommendedWeightRange(user.height, recommendedParams.minBMI, recommendedParams.maxBMI, recommendedParams);
    output.textContent = `${recommendedParams.minWeight}kg - ${recommendedParams.maxWeight}kg`
});