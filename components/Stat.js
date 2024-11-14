"use client";

export function DisplayStat({ type }) {
      return (
            <>
            {type === "earnMoneyRate" 
                  ?

                  /* Type of Stat to return: Rate of Money Earned */
                  <div className="lowercase">money per second</div>
                  
                  : type === "currentMoney" ?

                  <>Current Money</>

                  : type === "currentLevel" ?

                  <>Current Level</>

                  :

                  /* Type not found */
                  <>ERROR IN STAT.JS</>
            }
            </>
      )
}