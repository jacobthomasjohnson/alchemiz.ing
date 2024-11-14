"use client"

export function DisplayStat({ type }) {
      return (
            <>
            {type === "earnMoneyRate" 
                  ?

                  /* Type of Stat to return: Rate of Money Earned */
                  <div className="lowercase">$3.55/s</div>
                  
                  : type === "currentMoney" ?

                  <>$829</>

                  : type === "currentLevel" ?

                  <>Level 42</>

                  :

                  /* Type not found */
                  <>ERROR IN STAT.JS</>
            }
            </>
      )
}