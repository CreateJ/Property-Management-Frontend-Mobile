import React, {useEffect} from 'react'
import styles from './problem.less'

const Problem = () => {

  useEffect(()=>{
    // 获取问题信息
  });


  return (
    <div className={styles.problemContainer}>
      <ul className={styles.ul}>
        <li className={`${styles.li} ${styles.liTop}`}>
          <div>常见问题FAQ</div>
        </li>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>{
            return (
              <li className={styles.li} key={item}>
                <h3>{index+1}.这是一个问题吗?</h3>
                <div>
                  这是问题的答案这是问题的答案这是问题的答案这是问题的答案
                  这是问题的答案这是问题的答案这是问题的答案这是问题的答案
                  这是问题的答案这是问题的答案这是问题的答案这是问题的答案
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Problem
