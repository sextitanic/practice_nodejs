/**
 * Created by marswu on 15/5/5.
 */

function fabi(num)
{
    if(num < 2)
    {
        return 1;
    }
    else
    {
        return fabi(num - 1) + fabi(num - 2);
    }
}

console.log(fabi(40));

console.log('gogogo');