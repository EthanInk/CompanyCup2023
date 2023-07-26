function travleScore(tileDifficulty, hasScoutInParty, currentStep, stepAllowance){
    if(currentStep <= stepAllowance){
        const top = 150 / tileDifficulty;
        if(hasScoutInParty){
            top *= 2;
        }
        const bottom = (currentStep - 1)/ stepAllowance;
        bottom = erf(bottom) + 1
        return (top/bottom);
    } else {
        const top = 150 / tileDifficulty;
        if(hasScoutInParty){
            top *= 0.5;
        }
        const bottom = (currentStep - stepAllowance)/ stepAllowance;
        bottom = erf(bottom) + 1
        result = -1 * (top/bottom);
        return result;
    }
}


function erf(x) {
    var z;
    const ERF_A = 0.147; 
    var the_sign_of_x;
    if(0==x) {
        the_sign_of_x = 0;
        return 0;
    } else if(x>0){
        the_sign_of_x = 1;
    } else {
        the_sign_of_x = -1;
    }

    var one_plus_axsqrd = 1 + ERF_A * x * x;
    var four_ovr_pi_etc = 4/Math.PI + ERF_A * x * x;
    var ratio = four_ovr_pi_etc / one_plus_axsqrd;
    ratio *= x * -x;
    var expofun = Math.exp(ratio);
    var radical = Math.sqrt(1-expofun);
    z = radical * the_sign_of_x;
    return z;
}

function uclid(startX, startY, endX, endY){
    const x = endX - startX;
    x *= x;
    const y = endY - startY;
    y *= y;
}

module.exports = { uclid, erf, travleScore };