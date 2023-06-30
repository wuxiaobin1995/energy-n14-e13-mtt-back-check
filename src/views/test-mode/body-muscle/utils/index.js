/*
 * @Author      : Mr.bin
 * @Date        : 2023-06-30 14:33:24
 * @LastEditTime: 2023-06-30 17:39:39
 * @Description : 数据处理
 */

/**
 * @description: 计算推荐值
 */
export function calculateRecommend(parameter) {
  const sex = parameter.sex // 性别
  const weight = parameter.weight // 体重（kg）
  const height = parseFloat((parameter.height / 100).toFixed(2)) // 身高（m）
  const currentAge = parameter.currentAge // 当时测试时的岁数

  const bmi = parseInt((weight / height ** 2).toFixed(0)) // BMI指数
  const sqrtWeight = Math.sqrt(weight / 23) // 开根号

  // 颈椎后伸
  let cvRearProtractionRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      cvRearProtractionRecommend = 0.2 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvRearProtractionRecommend = 0.2 * weight
    }
  } else {
    if (currentAge >= 41) {
      cvRearProtractionRecommend =
        0.18 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvRearProtractionRecommend = 0.18 * weight
    }
  }
  cvRearProtractionRecommend = parseFloat(cvRearProtractionRecommend.toFixed(1))

  // 颈椎前屈
  let cvAnteflexionRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      cvAnteflexionRecommend = 0.143 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvAnteflexionRecommend = 0.143 * weight
    }
  } else {
    if (currentAge >= 41) {
      cvAnteflexionRecommend = 0.106 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvAnteflexionRecommend = 0.106 * weight
    }
  }
  cvAnteflexionRecommend = parseFloat(cvAnteflexionRecommend.toFixed(1))

  // 颈椎左侧屈
  let cvLeftSideRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      cvLeftSideRecommend = 0.15 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvLeftSideRecommend = 0.15 * weight
    }
  } else {
    if (currentAge >= 41) {
      cvLeftSideRecommend = 0.12 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvLeftSideRecommend = 0.12 * weight
    }
  }
  cvLeftSideRecommend = parseFloat(cvLeftSideRecommend.toFixed(1))

  // 颈椎右侧屈
  let cvRightSideRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      cvRightSideRecommend = 0.15 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvRightSideRecommend = 0.15 * weight
    }
  } else {
    if (currentAge >= 41) {
      cvRightSideRecommend = 0.12 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      cvRightSideRecommend = 0.12 * weight
    }
  }
  cvRightSideRecommend = parseFloat(cvRightSideRecommend.toFixed(1))

  // 躯干后伸
  let tRearProtractionRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tRearProtractionRecommend =
          (0.7 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tRearProtractionRecommend =
          0.7 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tRearProtractionRecommend =
          (0.7 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tRearProtractionRecommend =
          0.7 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tRearProtractionRecommend = 0.7 * weight
      } else {
        tRearProtractionRecommend =
          0.7 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tRearProtractionRecommend =
          (0.56 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tRearProtractionRecommend =
          0.56 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tRearProtractionRecommend =
          (0.56 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tRearProtractionRecommend =
          0.56 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tRearProtractionRecommend = 0.56 * weight
      } else {
        tRearProtractionRecommend =
          0.56 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  tRearProtractionRecommend = parseFloat(tRearProtractionRecommend.toFixed(1))

  // 躯干前屈
  let tAnteflexionRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tAnteflexionRecommend =
          (0.54 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tAnteflexionRecommend = 0.54 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tAnteflexionRecommend =
          (0.54 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tAnteflexionRecommend =
          0.54 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tAnteflexionRecommend = 0.54 * weight
      } else {
        tAnteflexionRecommend =
          0.54 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tAnteflexionRecommend =
          (0.37 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tAnteflexionRecommend = 0.37 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tAnteflexionRecommend =
          (0.37 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tAnteflexionRecommend =
          0.37 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tAnteflexionRecommend = 0.37 * weight
      } else {
        tAnteflexionRecommend =
          0.37 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  tAnteflexionRecommend = parseFloat(tAnteflexionRecommend.toFixed(1))

  // 躯干左侧屈
  let tLeftSideRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tLeftSideRecommend =
          (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tLeftSideRecommend = 0.5 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tLeftSideRecommend =
          (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tLeftSideRecommend =
          0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tLeftSideRecommend = 0.5 * weight
      } else {
        tLeftSideRecommend =
          0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tLeftSideRecommend =
          (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tLeftSideRecommend = 0.4 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tLeftSideRecommend =
          (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tLeftSideRecommend =
          0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tLeftSideRecommend = 0.4 * weight
      } else {
        tLeftSideRecommend =
          0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  tLeftSideRecommend = parseFloat(tLeftSideRecommend.toFixed(1))

  // 躯干右侧屈
  let tRightSideRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tRightSideRecommend =
          (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tRightSideRecommend = 0.5 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tRightSideRecommend =
          (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tRightSideRecommend =
          0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tRightSideRecommend = 0.5 * weight
      } else {
        tRightSideRecommend =
          0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        tRightSideRecommend =
          (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        tRightSideRecommend = 0.4 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        tRightSideRecommend =
          (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        tRightSideRecommend =
          0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        tRightSideRecommend = 0.4 * weight
      } else {
        tRightSideRecommend =
          0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  tRightSideRecommend = parseFloat(tRightSideRecommend.toFixed(1))

  // 上肢推
  let ulPushRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        ulPushRecommend =
          (1 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        ulPushRecommend = 1 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        ulPushRecommend =
          (1 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        ulPushRecommend =
          1 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        ulPushRecommend = 1 * weight
      } else {
        ulPushRecommend =
          1 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        ulPushRecommend =
          (0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        ulPushRecommend = 0.67 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        ulPushRecommend =
          (0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        ulPushRecommend =
          0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        ulPushRecommend = 0.67 * weight
      } else {
        ulPushRecommend =
          0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  ulPushRecommend = parseFloat(ulPushRecommend.toFixed(1))

  // 上肢拉
  let ulPullRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        ulPullRecommend =
          (0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        ulPullRecommend = 0.67 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        ulPullRecommend =
          (0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        ulPullRecommend =
          0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        ulPullRecommend = 0.67 * weight
      } else {
        ulPullRecommend =
          0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        ulPullRecommend =
          (0.45 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        ulPullRecommend = 0.45 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        ulPullRecommend =
          (0.45 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        ulPullRecommend =
          0.45 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        ulPullRecommend = 0.45 * weight
      } else {
        ulPullRecommend =
          0.45 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  ulPullRecommend = parseFloat(ulPullRecommend.toFixed(1))

  // 上肢左外展
  let ulLeftAbducentRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      ulLeftAbducentRecommend = 0.3 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      ulLeftAbducentRecommend = 0.3 * weight
    }
  } else {
    if (currentAge >= 41) {
      ulLeftAbducentRecommend = 0.2 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      ulLeftAbducentRecommend = 0.2 * weight
    }
  }
  ulLeftAbducentRecommend = parseFloat(ulLeftAbducentRecommend.toFixed(1))

  // 上肢右外展
  let ulRightAbducentRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      ulRightAbducentRecommend = 0.3 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      ulRightAbducentRecommend = 0.3 * weight
    }
  } else {
    if (currentAge >= 41) {
      ulRightAbducentRecommend = 0.2 * weight * (1 - (currentAge - 40) * 0.01)
    } else {
      ulRightAbducentRecommend = 0.2 * weight
    }
  }
  ulRightAbducentRecommend = parseFloat(ulRightAbducentRecommend.toFixed(1))

  // 下肢左后伸
  let llAfterLeftOutRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llAfterLeftOutRecommend =
          (0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterLeftOutRecommend = 0.6 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llAfterLeftOutRecommend =
          (0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llAfterLeftOutRecommend =
          0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterLeftOutRecommend = 0.6 * weight
      } else {
        llAfterLeftOutRecommend =
          0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llAfterLeftOutRecommend =
          (0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterLeftOutRecommend = 0.48 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llAfterLeftOutRecommend =
          (0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llAfterLeftOutRecommend =
          0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterLeftOutRecommend = 0.48 * weight
      } else {
        llAfterLeftOutRecommend =
          0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  llAfterLeftOutRecommend = parseFloat(llAfterLeftOutRecommend.toFixed(1))

  // 下肢右后伸
  let llAfterRightOutRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llAfterRightOutRecommend =
          (0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterRightOutRecommend = 0.6 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llAfterRightOutRecommend =
          (0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llAfterRightOutRecommend =
          0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterRightOutRecommend = 0.6 * weight
      } else {
        llAfterRightOutRecommend =
          0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llAfterRightOutRecommend =
          (0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterRightOutRecommend =
          0.48 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llAfterRightOutRecommend =
          (0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llAfterRightOutRecommend =
          0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llAfterRightOutRecommend = 0.48 * weight
      } else {
        llAfterRightOutRecommend =
          0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  llAfterRightOutRecommend = parseFloat(llAfterRightOutRecommend.toFixed(1))

  // 下肢左外展
  let llLeftAbducentRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llLeftAbducentRecommend =
          (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftAbducentRecommend = 0.4 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llLeftAbducentRecommend =
          (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llLeftAbducentRecommend =
          0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftAbducentRecommend = 0.4 * weight
      } else {
        llLeftAbducentRecommend =
          0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llLeftAbducentRecommend =
          (0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftAbducentRecommend = 0.32 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llLeftAbducentRecommend =
          (0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llLeftAbducentRecommend =
          0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftAbducentRecommend = 0.32 * weight
      } else {
        llLeftAbducentRecommend =
          0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  llLeftAbducentRecommend = parseFloat(llLeftAbducentRecommend.toFixed(1))

  // 下肢右外展
  let llRightAbducentRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llRightAbducentRecommend =
          (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llRightAbducentRecommend = 0.4 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llRightAbducentRecommend =
          (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llRightAbducentRecommend =
          0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llRightAbducentRecommend = 0.4 * weight
      } else {
        llRightAbducentRecommend =
          0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llRightAbducentRecommend =
          (0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llRightAbducentRecommend =
          0.32 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llRightAbducentRecommend =
          (0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llRightAbducentRecommend =
          0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llRightAbducentRecommend = 0.32 * weight
      } else {
        llRightAbducentRecommend =
          0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  llRightAbducentRecommend = parseFloat(llRightAbducentRecommend.toFixed(1))

  // 下肢左内收
  let llLeftInsideCollectRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llLeftInsideCollectRecommend =
          (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftInsideCollectRecommend =
          0.5 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llLeftInsideCollectRecommend =
          (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llLeftInsideCollectRecommend =
          0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftInsideCollectRecommend = 0.5 * weight
      } else {
        llLeftInsideCollectRecommend =
          0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llLeftInsideCollectRecommend =
          (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftInsideCollectRecommend =
          0.4 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llLeftInsideCollectRecommend =
          (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llLeftInsideCollectRecommend =
          0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llLeftInsideCollectRecommend = 0.4 * weight
      } else {
        llLeftInsideCollectRecommend =
          0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  llLeftInsideCollectRecommend = parseFloat(
    llLeftInsideCollectRecommend.toFixed(1)
  )

  // 下肢右内收
  let llRightInsideCollectRecommend = 0
  if (sex === '男') {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llRightInsideCollectRecommend =
          (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llRightInsideCollectRecommend =
          0.5 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llRightInsideCollectRecommend =
          (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llRightInsideCollectRecommend =
          0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llRightInsideCollectRecommend = 0.5 * weight
      } else {
        llRightInsideCollectRecommend =
          0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  } else {
    if (currentAge >= 41) {
      if (bmi > 23) {
        llRightInsideCollectRecommend =
          (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      } else if (bmi >= 20 && bmi <= 23) {
        llRightInsideCollectRecommend =
          0.4 * weight * (1 - (currentAge - 40) * 0.01)
      } else {
        llRightInsideCollectRecommend =
          (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
          (1 - (currentAge - 40) * 0.01)
      }
    } else {
      if (bmi > 23) {
        llRightInsideCollectRecommend =
          0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
      } else if (bmi >= 20 && bmi <= 23) {
        llRightInsideCollectRecommend = 0.4 * weight
      } else {
        llRightInsideCollectRecommend =
          0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
      }
    }
  }
  llRightInsideCollectRecommend = parseFloat(
    llRightInsideCollectRecommend.toFixed(1)
  )

  /* 返回结果 */
  return {
    cvRearProtractionRecommend, // 颈椎后伸推荐值
    cvAnteflexionRecommend, // 颈椎前屈推荐值
    cvLeftSideRecommend, // 颈椎左侧屈推荐值
    cvRightSideRecommend, // 颈椎右侧屈推荐值
    tRearProtractionRecommend, // 躯干后伸推荐值
    tAnteflexionRecommend, // 躯干前屈推荐值
    tLeftSideRecommend, // 躯干左侧屈推荐值
    tRightSideRecommend, // 躯干右侧屈推荐值
    ulPushRecommend, // 上肢推推荐值
    ulPullRecommend, // 上肢拉推荐值
    ulLeftAbducentRecommend, // 上肢左外展推荐值
    ulRightAbducentRecommend, // 上肢右外展推荐值
    llAfterLeftOutRecommend, // 下肢左后伸推荐值
    llAfterRightOutRecommend, // 下肢右后伸推荐值
    llLeftAbducentRecommend, // 下肢左外展推荐值
    llRightAbducentRecommend, // 下肢右外展推荐值
    llLeftInsideCollectRecommend, // 下肢左内收推荐值
    llRightInsideCollectRecommend // 下肢右内收推荐值
  }
}

/**
 * @description: 计算测量肌力比
 */
export function calculateMuscleRate(parameter) {
  const cvRearProtraction = parameter.cvRearProtraction // 颈椎后伸
  const cvAnteflexion = parameter.cvAnteflexion // 颈椎前屈
  const cvRightSide = parameter.cvRightSide // 颈椎右侧屈
  const cvLeftSide = parameter.cvLeftSide // 颈椎左侧屈
  const tRearProtraction = parameter.tRearProtraction // 躯干后伸
  const tAnteflexion = parameter.tAnteflexion // 躯干前屈
  const tLeftSide = parameter.tLeftSide // 躯干左侧屈
  const tRightSide = parameter.tRightSide // 躯干右侧屈
  const ulPush = parameter.ulPush // 上肢推
  const ulPull = parameter.ulPull // 上肢拉
  const ulLeftAbducent = parameter.ulLeftAbducent // 上肢左外展
  const ulRightAbducent = parameter.ulRightAbducent // 上肢右外展
  const llAfterLeftOut = parameter.llAfterLeftOut // 下肢左后伸
  const llAfterRightOut = parameter.llAfterRightOut // 下肢右后伸
  const llLeftAbducent = parameter.llLeftAbducent // 下肢左外展
  const llRightAbducent = parameter.llRightAbducent // 下肢右外展
  const llLeftInsideCollect = parameter.llLeftInsideCollect // 下肢左内收
  const llRightInsideCollect = parameter.llRightInsideCollect // 下肢右内收

  // 颈椎：后伸/前屈
  let cvRearProtractionRate = 0
  if (cvRearProtraction && cvAnteflexion) {
    cvRearProtractionRate = parseInt(
      ((100 / cvAnteflexion) * cvRearProtraction).toFixed(0)
    )
  }

  // 颈椎：侧屈
  let cvLeftSideRate = 0
  if (cvLeftSide && cvRightSide) {
    cvLeftSideRate = parseInt(((100 / cvRightSide) * cvLeftSide).toFixed(0))
  }

  // 躯干：后伸/前屈
  let tRearProtractionRate = 0
  if (tRearProtraction && tAnteflexion) {
    tRearProtractionRate = parseInt(
      ((100 / tAnteflexion) * tRearProtraction).toFixed(0)
    )
  }

  // 躯干：侧屈
  let tLeftSideRate = 0
  if (tLeftSide && tRightSide) {
    tLeftSideRate = parseInt(((100 / tRightSide) * tLeftSide).toFixed(0))
  }

  // 上肢：推/拉
  let ulPushRate = 0
  if (ulPush && ulPull) {
    ulPushRate = parseInt(((100 / ulPull) * ulPush).toFixed(0))
  }

  // 上肢：外展
  let ulLeftAbducentRate = 0
  if (ulLeftAbducent && ulRightAbducent) {
    ulLeftAbducentRate = parseInt(
      ((100 / ulRightAbducent) * ulLeftAbducent).toFixed(0)
    )
  }

  // 下肢：后伸
  let llAfterLeftOutRate = 0
  if (llAfterLeftOut && llAfterRightOut) {
    llAfterLeftOutRate = parseInt(
      ((100 / llAfterRightOut) * llAfterLeftOut).toFixed(0)
    )
  }

  // 下肢：外展
  let llLeftAbducentRate = 0
  if (llLeftAbducent && llRightAbducent) {
    llLeftAbducentRate = parseInt(
      ((100 / llRightAbducent) * llLeftAbducent).toFixed(0)
    )
  }

  // 下肢：内收
  let llLeftInsideCollectRate = 0
  if (llLeftInsideCollect && llRightInsideCollect) {
    llLeftInsideCollectRate = parseInt(
      ((100 / llRightInsideCollect) * llLeftInsideCollect).toFixed(0)
    )
  }

  /* 返回结果 */
  return {
    cvRearProtractionRate, // 颈椎：后伸/前屈
    cvLeftSideRate, // 颈椎：侧屈
    tRearProtractionRate, // 躯干：后伸/前屈
    tLeftSideRate, // 躯干：侧屈
    ulPushRate, // 上肢：推/拉
    ulLeftAbducentRate, // 上肢：外展
    llAfterLeftOutRate, // 下肢：后伸
    llLeftAbducentRate, // 下肢：外展
    llLeftInsideCollectRate // 下肢：内收
  }
}

/**
 * @description: 计算得分
 */
export function calculateScore(parameter0, parameter1, parameter2) {
  const sex = parameter0.sex // 性别

  const cvRearProtraction = parameter1.cvRearProtraction // 颈椎后伸
  const cvAnteflexion = parameter1.cvAnteflexion // 颈椎前屈
  const cvRightSide = parameter1.cvRightSide // 颈椎右侧屈
  const cvLeftSide = parameter1.cvLeftSide // 颈椎左侧屈
  const tRearProtraction = parameter1.tRearProtraction // 躯干后伸
  const tAnteflexion = parameter1.tAnteflexion // 躯干前屈
  const tLeftSide = parameter1.tLeftSide // 躯干左侧屈
  const tRightSide = parameter1.tRightSide // 躯干右侧屈
  const ulPush = parameter1.ulPush // 上肢推
  const ulPull = parameter1.ulPull // 上肢拉
  const ulLeftAbducent = parameter1.ulLeftAbducent // 上肢左外展
  const ulRightAbducent = parameter1.ulRightAbducent // 上肢右外展
  const llAfterLeftOut = parameter1.llAfterLeftOut // 下肢左后伸
  const llAfterRightOut = parameter1.llAfterRightOut // 下肢右后伸
  const llLeftAbducent = parameter1.llLeftAbducent // 下肢左外展
  const llRightAbducent = parameter1.llRightAbducent // 下肢右外展
  const llLeftInsideCollect = parameter1.llLeftInsideCollect // 下肢左内收
  const llRightInsideCollect = parameter1.llRightInsideCollect // 下肢右内收

  const cvRearProtractionRecommend = parameter2.cvRearProtractionRecommend // 颈椎后伸推荐值
  const cvAnteflexionRecommend = parameter2.cvAnteflexionRecommend // 颈椎前屈推荐值
  const cvLeftSideRecommend = parameter2.cvLeftSideRecommend // 颈椎左侧屈推荐值
  const cvRightSideRecommend = parameter2.cvRightSideRecommend // 颈椎右侧屈推荐值
  const tRearProtractionRecommend = parameter2.tRearProtractionRecommend // 躯干后伸推荐值
  const tAnteflexionRecommend = parameter2.tAnteflexionRecommend // 躯干前屈推荐值
  const tLeftSideRecommend = parameter2.tLeftSideRecommend // 躯干左侧屈推荐值
  const tRightSideRecommend = parameter2.tRightSideRecommend // 躯干右侧屈推荐值
  const ulPushRecommend = parameter2.ulPushRecommend // 上肢推推荐值
  const ulPullRecommend = parameter2.ulPullRecommend // 上肢拉推荐值
  const ulLeftAbducentRecommend = parameter2.ulLeftAbducentRecommend // 上肢左外展推荐值
  const ulRightAbducentRecommend = parameter2.ulRightAbducentRecommend // 上肢右外展推荐值
  const llAfterLeftOutRecommend = parameter2.llAfterLeftOutRecommend // 下肢左后伸推荐值
  const llAfterRightOutRecommend = parameter2.llAfterRightOutRecommend // 下肢右后伸推荐值
  const llLeftAbducentRecommend = parameter2.llLeftAbducentRecommend // 下肢左外展推荐值
  const llRightAbducentRecommend = parameter2.llRightAbducentRecommend // 下肢右外展推荐值
  const llLeftInsideCollectRecommend = parameter2.llLeftInsideCollectRecommend // 下肢左内收推荐值
  const llRightInsideCollectRecommend = parameter2.llRightInsideCollectRecommend // 下肢右内收推荐值

  /* 颈椎：后伸/前屈 */
  let cvRearProtractionScore = 0
  let cvAnteflexionScore = 0
  let oneRateScore = 0
  // 颈椎后伸
  if (cvRearProtraction < cvRearProtractionRecommend * 2) {
    cvRearProtractionScore =
      (cvRearProtraction / (cvRearProtractionRecommend * 2)) * 10
  } else {
    cvRearProtractionScore = 10
  }
  cvRearProtractionScore = parseFloat(cvRearProtractionScore.toFixed(1))
  // 颈椎前屈
  if (cvAnteflexion < cvAnteflexionRecommend * 2) {
    cvAnteflexionScore = (cvAnteflexion / (cvAnteflexionRecommend * 2)) * 10
  } else {
    cvAnteflexionScore = 10
  }
  cvAnteflexionScore = parseFloat(cvAnteflexionScore.toFixed(1))
  // 肌力比得分
  const one = cvRearProtraction / cvAnteflexion
  if (sex === '男') {
    if (one >= 1.35 && one <= 1.45) {
      oneRateScore = 10
    } else if (one > 1.2 && one < 1.35) {
      oneRateScore = 3.33 * (one - 1.2) * 10 + 5
    } else if (one > 1.45 && one < 1.6) {
      oneRateScore = 10 - 3.33 * (one - 1.45) * 10
    } else if (one === 1.2 || one === 1.6) {
      oneRateScore = 5
    } else if (one > 1.05 && one < 1.2) {
      oneRateScore = 5 - 3.33 * (1.2 - one) * 10
    } else if (one > 1.6 && one < 1.75) {
      oneRateScore = 5 - 3.33 * (one - 1.6) * 10
    } else {
      oneRateScore = 0
    }
  } else {
    if (one >= 1.6 && one <= 1.75) {
      oneRateScore = 10
    } else if (one > 1.5 && one < 1.65) {
      oneRateScore = 3.33 * (one - 1.5) * 10 + 5
    } else if (one > 1.75 && one < 1.9) {
      oneRateScore = 10 - 3.33 * (one - 1.75) * 10
    } else if (one === 1.5 || one === 1.9) {
      oneRateScore = 5
    } else if (one > 1.35 && one < 1.5) {
      oneRateScore = 5 - 3.33 * (1.5 - one) * 10
    } else if (one > 1.9 && one < 2.05) {
      oneRateScore = 5 - 3.33 * (one - 1.9) * 10
    } else {
      oneRateScore = 0
    }
  }
  oneRateScore = parseFloat(oneRateScore.toFixed(1))

  /* 颈椎：侧屈 */
  let cvLeftSideScore = 0
  let cvRightSideScore = 0
  let twoRateScore = 0
  // 颈椎左侧屈
  if (cvLeftSide < cvLeftSideRecommend * 2) {
    cvLeftSideScore = (cvLeftSide / (cvLeftSideRecommend * 2)) * 10
  } else {
    cvLeftSideScore = 10
  }
  cvLeftSideScore = parseFloat(cvLeftSideScore.toFixed(1))
  // 颈椎右侧屈
  if (cvRightSide < cvRightSideRecommend * 2) {
    cvRightSideScore = (cvRightSide / (cvRightSideRecommend * 2)) * 10
  } else {
    cvRightSideScore = 10
  }
  cvRightSideScore = parseFloat(cvRightSideScore.toFixed(1))
  // 肌力比得分
  const two = cvLeftSide / cvRightSide
  if (two >= 0.95 && two <= 1.05) {
    twoRateScore = 10
  } else if (two > 0.8 && two < 0.95) {
    twoRateScore = 3.33 * (two - 0.8) * 10 + 5
  } else if (two > 1.05 && two < 1.2) {
    twoRateScore = 10 - 3.33 * (two - 1.05) * 10
  } else if (two === 0.8 || two === 1.2) {
    twoRateScore = 5
  } else if (two > 0.65 && two < 0.8) {
    twoRateScore = 5 - 3.33 * (0.8 - two) * 10
  } else if (two > 1.2 && two < 1.35) {
    twoRateScore = 5 - 3.33 * (two - 1.2) * 10
  } else {
    twoRateScore = 0
  }
  twoRateScore = parseFloat(twoRateScore.toFixed(1))

  /* 躯干：后伸/前屈 */
  let tRearProtractionScore = 0
  let tAnteflexionScore = 0
  let threeRateScore = 0
  // 躯干后伸
  if (tRearProtraction < tRearProtractionRecommend * 2) {
    tRearProtractionScore =
      (tRearProtraction / (tRearProtractionRecommend * 2)) * 10
  } else {
    tRearProtractionScore = 10
  }
  tRearProtractionScore = parseFloat(tRearProtractionScore.toFixed(1))
  // 躯干前屈
  if (tAnteflexion < tAnteflexionRecommend * 2) {
    tAnteflexionScore = (tAnteflexion / (tAnteflexionRecommend * 2)) * 10
  } else {
    tAnteflexionScore = 10
  }
  tAnteflexionScore = parseFloat(tAnteflexionScore.toFixed(1))
  // 肌力比得分
  const three = tRearProtraction / tAnteflexion
  if (sex === '男') {
    if (three >= 1.2 && three <= 1.35) {
      threeRateScore = 10
    } else if (three > 1.1 && three < 1.25) {
      threeRateScore = 3.33 * (three - 1.1) * 10 + 5
    } else if (three > 1.35 && three < 1.5) {
      threeRateScore = 10 - 3.33 * (three - 1.35) * 10
    } else if (three === 1.1 || three === 1.5) {
      threeRateScore = 5
    } else if (three > 0.95 && three < 1.1) {
      threeRateScore = 5 - 3.33 * (1.1 - three) * 10
    } else if (three > 1.5 && three < 1.65) {
      threeRateScore = 5 - 3.33 * (three - 1.5) * 10
    } else {
      threeRateScore = 0
    }
  } else {
    if (three >= 1.45 && three <= 1.55) {
      threeRateScore = 10
    } else if (three > 1.3 && three < 1.45) {
      threeRateScore = 3.33 * (three - 1.3) * 10 + 5
    } else if (three > 1.55 && three < 1.7) {
      threeRateScore = 10 - 3.33 * (three - 1.55) * 10
    } else if (three === 1.3 || three === 1.7) {
      threeRateScore = 5
    } else if (three > 1.15 && three < 1.3) {
      threeRateScore = 5 - 3.33 * (1.3 - three) * 10
    } else if (three > 1.7 && three < 1.85) {
      threeRateScore = 5 - 3.33 * (three - 1.7) * 10
    } else {
      threeRateScore = 0
    }
  }
  threeRateScore = parseFloat(threeRateScore.toFixed(1))

  /* 躯干：侧屈 */
  let tLeftSideScore = 0
  let tRightSideScore = 0
  let fourRateScore = 0
  // 躯干左侧屈
  if (tLeftSide < tLeftSideRecommend * 2) {
    tLeftSideScore = (tLeftSide / (tLeftSideRecommend * 2)) * 10
  } else {
    tLeftSideScore = 10
  }
  tLeftSideScore = parseFloat(tLeftSideScore.toFixed(1))
  // 躯干右侧屈
  if (tRightSide < tRightSideRecommend * 2) {
    tRightSideScore = (tRightSide / (tRightSideRecommend * 2)) * 10
  } else {
    tRightSideScore = 10
  }
  tRightSideScore = parseFloat(tRightSideScore.toFixed(1))
  // 肌力比得分
  const four = tLeftSide / tRightSide
  if (four >= 0.95 && four <= 1.05) {
    fourRateScore = 10
  } else if (four > 0.8 && four < 0.95) {
    fourRateScore = 3.33 * (four - 0.8) * 10 + 5
  } else if (four > 1.05 && four < 1.2) {
    fourRateScore = 10 - 3.33 * (four - 1.05) * 10
  } else if (four === 0.8 || four === 1.2) {
    fourRateScore = 5
  } else if (four > 0.65 && four < 0.8) {
    fourRateScore = 5 - 3.33 * (0.8 - four) * 10
  } else if (four > 1.2 && four < 1.35) {
    fourRateScore = 5 - 3.33 * (four - 1.2) * 10
  } else {
    fourRateScore = 0
  }
  fourRateScore = parseFloat(fourRateScore.toFixed(1))

  /* 上肢：推/拉 */
  let ulPushScore = 0
  let ulPullScore = 0
  let fiveRateScore = 0
  // 上肢推
  if (ulPush < ulPushRecommend * 2) {
    ulPushScore = (ulPush / (ulPushRecommend * 2)) * 10
  } else {
    ulPushScore = 10
  }
  ulPushScore = parseFloat(ulPushScore.toFixed(1))
  // 上肢拉
  if (ulPull < ulPullRecommend * 2) {
    ulPullScore = (ulPull / (ulPullRecommend * 2)) * 10
  } else {
    ulPullScore = 10
  }
  ulPullScore = parseFloat(ulPullScore.toFixed(1))
  // 肌力比得分
  const five = ulPush / ulPull
  if (five >= 1.45 && five <= 1.55) {
    fiveRateScore = 10
  } else if (five > 1.3 && five < 1.45) {
    fiveRateScore = 3.33 * (five - 1.3) * 10 + 5
  } else if (five > 1.55 && five < 1.7) {
    fiveRateScore = 10 - 3.33 * (five - 1.55) * 10
  } else if (five === 1.3 || five === 1.7) {
    fiveRateScore = 5
  } else if (five > 1.15 && five < 1.3) {
    fiveRateScore = 5 - 3.33 * (1.3 - five) * 10
  } else if (five > 1.7 && five < 1.85) {
    fiveRateScore = 5 - 3.33 * (five - 1.7) * 10
  } else {
    fiveRateScore = 0
  }
  fiveRateScore = parseFloat(fiveRateScore.toFixed(1))

  /* 上肢：外展 */
  let ulLeftAbducentScore = 0
  let ulRightAbducentScore = 0
  let sixRateScore = 0
  // 上肢左外展
  if (ulLeftAbducent < ulLeftAbducentRecommend * 2) {
    ulLeftAbducentScore = (ulLeftAbducent / (ulLeftAbducentRecommend * 2)) * 10
  } else {
    ulLeftAbducentScore = 10
  }
  ulLeftAbducentScore = parseFloat(ulLeftAbducentScore.toFixed(1))
  // 上肢右外展
  if (ulRightAbducent < ulRightAbducentRecommend * 2) {
    ulRightAbducentScore =
      (ulRightAbducent / (ulRightAbducentRecommend * 2)) * 10
  } else {
    ulRightAbducentScore = 10
  }
  ulRightAbducentScore = parseFloat(ulRightAbducentScore.toFixed(1))
  // 肌力比得分
  const six = ulLeftAbducent / ulRightAbducent
  if (six >= 0.95 && six <= 1.05) {
    sixRateScore = 10
  } else if (six > 0.8 && six < 0.95) {
    sixRateScore = 3.33 * (six - 0.8) * 10 + 5
  } else if (six > 1.05 && six < 1.2) {
    sixRateScore = 10 - 3.33 * (six - 1.05) * 10
  } else if (six === 0.8 || six === 1.2) {
    sixRateScore = 5
  } else if (six > 0.65 && six < 0.8) {
    sixRateScore = 5 - 3.33 * (0.8 - six) * 10
  } else if (six > 1.2 && six < 1.35) {
    sixRateScore = 5 - 3.33 * (six - 1.2) * 10
  } else {
    sixRateScore = 0
  }
  sixRateScore = parseFloat(sixRateScore.toFixed(1))

  /* 下肢：后伸 */
  let llAfterLeftOutScore = 0
  let llAfterRightOutScore = 0
  let sevenRateScore = 0
  // 下肢左后伸
  if (llAfterLeftOut < llAfterLeftOutRecommend * 2) {
    llAfterLeftOutScore = (llAfterLeftOut / (llAfterLeftOutRecommend * 2)) * 10
  } else {
    llAfterLeftOutScore = 10
  }
  llAfterLeftOutScore = parseFloat(llAfterLeftOutScore.toFixed(1))
  // 下肢右后伸
  if (llAfterRightOut < llAfterRightOutRecommend * 2) {
    llAfterRightOutScore =
      (llAfterRightOut / (llAfterRightOutRecommend * 2)) * 10
  } else {
    llAfterRightOutScore = 10
  }
  llAfterRightOutScore = parseFloat(llAfterRightOutScore.toFixed(1))
  // 肌力比得分
  const seven = llAfterLeftOut / llAfterRightOut
  if (seven >= 0.95 && seven <= 1.05) {
    sevenRateScore = 10
  } else if (seven > 0.8 && seven < 0.95) {
    sevenRateScore = 3.33 * (seven - 0.8) * 10 + 5
  } else if (seven > 1.05 && seven < 1.2) {
    sevenRateScore = 10 - 3.33 * (seven - 1.05) * 10
  } else if (seven === 0.8 || seven === 1.2) {
    sevenRateScore = 5
  } else if (seven > 0.65 && seven < 0.8) {
    sevenRateScore = 5 - 3.33 * (0.8 - seven) * 10
  } else if (seven > 1.2 && seven < 1.35) {
    sevenRateScore = 5 - 3.33 * (seven - 1.2) * 10
  } else {
    sevenRateScore = 0
  }
  sevenRateScore = parseFloat(sevenRateScore.toFixed(1))

  /* 下肢：外展 */
  let llLeftAbducentScore = 0
  let llRightAbducentScore = 0
  let eightRateScore = 0
  // 下肢左外展
  if (llLeftAbducent < llLeftAbducentRecommend * 2) {
    llLeftAbducentScore = (llLeftAbducent / (llLeftAbducentRecommend * 2)) * 10
  } else {
    llLeftAbducentScore = 10
  }
  llLeftAbducentScore = parseFloat(llLeftAbducentScore.toFixed(1))
  // 下肢右外展
  if (llRightAbducent < llRightAbducentRecommend * 2) {
    llRightAbducentScore =
      (llRightAbducent / (llRightAbducentRecommend * 2)) * 10
  } else {
    llRightAbducentScore = 10
  }
  llRightAbducentScore = parseFloat(llRightAbducentScore.toFixed(1))
  // 肌力比得分
  const eight = llLeftAbducent / llRightAbducent
  if (eight >= 0.95 && eight <= 1.05) {
    eightRateScore = 10
  } else if (eight > 0.8 && eight < 0.95) {
    eightRateScore = 3.33 * (eight - 0.8) * 10 + 5
  } else if (eight > 1.05 && eight < 1.2) {
    eightRateScore = 10 - 3.33 * (eight - 1.05) * 10
  } else if (eight === 0.8 || eight === 1.2) {
    eightRateScore = 5
  } else if (eight > 0.65 && eight < 0.8) {
    eightRateScore = 5 - 3.33 * (0.8 - eight) * 10
  } else if (eight > 1.2 && eight < 1.35) {
    eightRateScore = 5 - 3.33 * (eight - 1.2) * 10
  } else {
    eightRateScore = 0
  }
  eightRateScore = parseFloat(eightRateScore.toFixed(1))

  /* 下肢：内收 */
  let llLeftInsideCollectScore = 0
  let llRightInsideCollectScore = 0
  let nineRateScore = 0
  // 下肢左内收
  if (llLeftInsideCollect < llLeftInsideCollectRecommend * 2) {
    llLeftInsideCollectScore =
      (llLeftInsideCollect / (llLeftInsideCollectRecommend * 2)) * 10
  } else {
    llLeftInsideCollectScore = 10
  }
  llLeftInsideCollectScore = parseFloat(llLeftInsideCollectScore.toFixed(1))
  // 下肢右内收
  if (llRightInsideCollect < llRightInsideCollectRecommend * 2) {
    llRightInsideCollectScore =
      (llRightInsideCollect / (llRightInsideCollectRecommend * 2)) * 10
  } else {
    llRightInsideCollectScore = 10
  }
  llRightInsideCollectScore = parseFloat(llRightInsideCollectScore.toFixed(1))
  // 肌力比得分
  const nine = llLeftInsideCollect / llRightInsideCollect
  if (nine >= 0.95 && nine <= 1.05) {
    nineRateScore = 10
  } else if (nine > 0.8 && nine < 0.95) {
    nineRateScore = 3.33 * (nine - 0.8) * 10 + 5
  } else if (nine > 1.05 && nine < 1.2) {
    nineRateScore = 10 - 3.33 * (nine - 1.05) * 10
  } else if (nine === 0.8 || nine === 1.2) {
    nineRateScore = 5
  } else if (nine > 0.65 && nine < 0.8) {
    nineRateScore = 5 - 3.33 * (0.8 - nine) * 10
  } else if (nine > 1.2 && nine < 1.35) {
    nineRateScore = 5 - 3.33 * (nine - 1.2) * 10
  } else {
    nineRateScore = 0
  }
  nineRateScore = parseFloat(nineRateScore.toFixed(1))

  /* 返回结果 */
  return {
    cvRearProtractionScore,
    cvAnteflexionScore,
    oneRateScore,

    cvLeftSideScore,
    cvRightSideScore,
    twoRateScore,

    tRearProtractionScore,
    tAnteflexionScore,
    threeRateScore,

    tLeftSideScore,
    tRightSideScore,
    fourRateScore,

    ulPushScore,
    ulPullScore,
    fiveRateScore,

    ulLeftAbducentScore,
    ulRightAbducentScore,
    sixRateScore,

    llAfterLeftOutScore,
    llAfterRightOutScore,
    sevenRateScore,

    llLeftAbducentScore,
    llRightAbducentScore,
    eightRateScore,

    llLeftInsideCollectScore,
    llRightInsideCollectScore,
    nineRateScore
  }
}

/**
 * @description: 计算分级评价
 */
export function calculateClassification(parameter) {
  const oneEvaluate = '差'
  const twoEvaluate = '较差'
  const threeEvaluate = '中'
  const fourEvaluate = '良'
  const fiveEvaluate = '优秀'

  const cvRearProtractionScore = parameter.cvRearProtractionScore
  const cvAnteflexionScore = parameter.cvAnteflexionScore
  const oneRateScore = parameter.oneRateScore
  const cvLeftSideScore = parameter.cvLeftSideScore
  const cvRightSideScore = parameter.cvRightSideScore
  const twoRateScore = parameter.twoRateScore
  const tRearProtractionScore = parameter.tRearProtractionScore
  const tAnteflexionScore = parameter.tAnteflexionScore
  const threeRateScore = parameter.threeRateScore
  const tLeftSideScore = parameter.tLeftSideScore
  const tRightSideScore = parameter.tRightSideScore
  const fourRateScore = parameter.fourRateScore
  const ulPushScore = parameter.ulPushScore
  const ulPullScore = parameter.ulPullScore
  const fiveRateScore = parameter.fiveRateScore
  const ulLeftAbducentScore = parameter.ulLeftAbducentScore
  const ulRightAbducentScore = parameter.ulRightAbducentScore
  const sixRateScore = parameter.sixRateScore
  const llAfterLeftOutScore = parameter.llAfterLeftOutScore
  const llAfterRightOutScore = parameter.llAfterRightOutScore
  const sevenRateScore = parameter.sevenRateScore
  const llLeftAbducentScore = parameter.llLeftAbducentScore
  const llRightAbducentScore = parameter.llRightAbducentScore
  const eightRateScore = parameter.eightRateScore
  const llLeftInsideCollectScore = parameter.llLeftInsideCollectScore
  const llRightInsideCollectScore = parameter.llRightInsideCollectScore
  const nineRateScore = parameter.nineRateScore

  /* 颈椎：后伸/前屈 */
  // 颈椎后伸
  let cvRearProtractionEvaluate = ''
  if (cvRearProtractionScore < 4) {
    cvRearProtractionEvaluate = oneEvaluate
  } else if (cvRearProtractionScore >= 4 && cvRearProtractionScore < 5) {
    cvRearProtractionEvaluate = twoEvaluate
  } else if (cvRearProtractionScore >= 5 && cvRearProtractionScore < 7) {
    cvRearProtractionEvaluate = threeEvaluate
  } else if (cvRearProtractionScore >= 7 && cvRearProtractionScore < 8) {
    cvRearProtractionEvaluate = fourEvaluate
  } else {
    cvRearProtractionEvaluate = fiveEvaluate
  }
  // 颈椎前屈
  let cvAnteflexionEvaluate = ''
  if (cvAnteflexionScore < 4) {
    cvAnteflexionEvaluate = oneEvaluate
  } else if (cvAnteflexionScore >= 4 && cvAnteflexionScore < 5) {
    cvAnteflexionEvaluate = twoEvaluate
  } else if (cvAnteflexionScore >= 5 && cvAnteflexionScore < 7) {
    cvAnteflexionEvaluate = threeEvaluate
  } else if (cvAnteflexionScore >= 7 && cvAnteflexionScore < 8) {
    cvAnteflexionEvaluate = fourEvaluate
  } else {
    cvAnteflexionEvaluate = fiveEvaluate
  }
  // 肌力比
  let oneRateEvaluate = ''
  if (oneRateScore < 4) {
    oneRateEvaluate = oneEvaluate
  } else if (oneRateScore >= 4 && oneRateScore < 5) {
    oneRateEvaluate = twoEvaluate
  } else if (oneRateScore >= 5 && oneRateScore < 7) {
    oneRateEvaluate = threeEvaluate
  } else if (oneRateScore >= 7 && oneRateScore < 8) {
    oneRateEvaluate = fourEvaluate
  } else {
    oneRateEvaluate = fiveEvaluate
  }

  /* 颈椎：侧屈 */
  // 颈椎左侧屈
  let cvLeftSideEvaluate = ''
  if (cvLeftSideScore < 4) {
    cvLeftSideEvaluate = oneEvaluate
  } else if (cvLeftSideScore >= 4 && cvLeftSideScore < 5) {
    cvLeftSideEvaluate = twoEvaluate
  } else if (cvLeftSideScore >= 5 && cvLeftSideScore < 7) {
    cvLeftSideEvaluate = threeEvaluate
  } else if (cvLeftSideScore >= 7 && cvLeftSideScore < 8) {
    cvLeftSideEvaluate = fourEvaluate
  } else {
    cvLeftSideEvaluate = fiveEvaluate
  }
  // 颈椎右侧屈
  let cvRightSideEvaluate = ''
  if (cvRightSideScore < 4) {
    cvRightSideEvaluate = oneEvaluate
  } else if (cvRightSideScore >= 4 && cvRightSideScore < 5) {
    cvRightSideEvaluate = twoEvaluate
  } else if (cvRightSideScore >= 5 && cvRightSideScore < 7) {
    cvRightSideEvaluate = threeEvaluate
  } else if (cvRightSideScore >= 7 && cvRightSideScore < 8) {
    cvRightSideEvaluate = fourEvaluate
  } else {
    cvRightSideEvaluate = fiveEvaluate
  }
  // 肌力比
  let twoRateEvaluate = ''
  if (twoRateScore < 4) {
    twoRateEvaluate = oneEvaluate
  } else if (twoRateScore >= 4 && twoRateScore < 5) {
    twoRateEvaluate = twoEvaluate
  } else if (twoRateScore >= 5 && twoRateScore < 7) {
    twoRateEvaluate = threeEvaluate
  } else if (twoRateScore >= 7 && twoRateScore < 8) {
    twoRateEvaluate = fourEvaluate
  } else {
    twoRateEvaluate = fiveEvaluate
  }

  /* 躯干：后伸/前屈 */
  // 躯干后伸
  let tRearProtractionEvaluate = ''
  if (tRearProtractionScore < 4) {
    tRearProtractionEvaluate = oneEvaluate
  } else if (tRearProtractionScore >= 4 && tRearProtractionScore < 5) {
    tRearProtractionEvaluate = twoEvaluate
  } else if (tRearProtractionScore >= 5 && tRearProtractionScore < 7) {
    tRearProtractionEvaluate = threeEvaluate
  } else if (tRearProtractionScore >= 7 && tRearProtractionScore < 8) {
    tRearProtractionEvaluate = fourEvaluate
  } else {
    tRearProtractionEvaluate = fiveEvaluate
  }
  // 躯干前屈
  let tAnteflexionEvaluate = ''
  if (tAnteflexionScore < 4) {
    tAnteflexionEvaluate = oneEvaluate
  } else if (tAnteflexionScore >= 4 && tAnteflexionScore < 5) {
    tAnteflexionEvaluate = twoEvaluate
  } else if (tAnteflexionScore >= 5 && tAnteflexionScore < 7) {
    tAnteflexionEvaluate = threeEvaluate
  } else if (tAnteflexionScore >= 7 && tAnteflexionScore < 8) {
    tAnteflexionEvaluate = fourEvaluate
  } else {
    tAnteflexionEvaluate = fiveEvaluate
  }
  // 肌力比
  let threeRateEvaluate = ''
  if (threeRateScore < 4) {
    threeRateEvaluate = oneEvaluate
  } else if (threeRateScore >= 4 && threeRateScore < 5) {
    threeRateEvaluate = twoEvaluate
  } else if (threeRateScore >= 5 && threeRateScore < 7) {
    threeRateEvaluate = threeEvaluate
  } else if (threeRateScore >= 7 && threeRateScore < 8) {
    threeRateEvaluate = fourEvaluate
  } else {
    threeRateEvaluate = fiveEvaluate
  }

  /* 躯干：侧屈 */
  // 躯干左侧屈
  let tLeftSideEvaluate = ''
  if (tLeftSideScore < 4) {
    tLeftSideEvaluate = oneEvaluate
  } else if (tLeftSideScore >= 4 && tLeftSideScore < 5) {
    tLeftSideEvaluate = twoEvaluate
  } else if (tLeftSideScore >= 5 && tLeftSideScore < 7) {
    tLeftSideEvaluate = threeEvaluate
  } else if (tLeftSideScore >= 7 && tLeftSideScore < 8) {
    tLeftSideEvaluate = fourEvaluate
  } else {
    tLeftSideEvaluate = fiveEvaluate
  }
  // 躯干右侧屈
  let tRightSideEvaluate = ''
  if (tRightSideScore < 4) {
    tRightSideEvaluate = oneEvaluate
  } else if (tRightSideScore >= 4 && tRightSideScore < 5) {
    tRightSideEvaluate = twoEvaluate
  } else if (tRightSideScore >= 5 && tRightSideScore < 7) {
    tRightSideEvaluate = threeEvaluate
  } else if (tRightSideScore >= 7 && tRightSideScore < 8) {
    tRightSideEvaluate = fourEvaluate
  } else {
    tRightSideEvaluate = fiveEvaluate
  }
  // 肌力比
  let fourRateEvaluate = ''
  if (fourRateScore < 4) {
    fourRateEvaluate = oneEvaluate
  } else if (fourRateScore >= 4 && fourRateScore < 5) {
    fourRateEvaluate = twoEvaluate
  } else if (fourRateScore >= 5 && fourRateScore < 7) {
    fourRateEvaluate = threeEvaluate
  } else if (fourRateScore >= 7 && fourRateScore < 8) {
    fourRateEvaluate = fourEvaluate
  } else {
    fourRateEvaluate = fiveEvaluate
  }

  /* 肢：推/拉 */
  // 上肢推
  let ulPushEvaluate = ''
  if (ulPushScore < 4) {
    ulPushEvaluate = oneEvaluate
  } else if (ulPushScore >= 4 && ulPushScore < 5) {
    ulPushEvaluate = twoEvaluate
  } else if (ulPushScore >= 5 && ulPushScore < 7) {
    ulPushEvaluate = threeEvaluate
  } else if (ulPushScore >= 7 && ulPushScore < 8) {
    ulPushEvaluate = fourEvaluate
  } else {
    ulPushEvaluate = fiveEvaluate
  }
  // 上肢拉
  let ulPullEvaluate = ''
  if (ulPullScore < 4) {
    ulPullEvaluate = oneEvaluate
  } else if (ulPullScore >= 4 && ulPullScore < 5) {
    ulPullEvaluate = twoEvaluate
  } else if (ulPullScore >= 5 && ulPullScore < 7) {
    ulPullEvaluate = threeEvaluate
  } else if (ulPullScore >= 7 && ulPullScore < 8) {
    ulPullEvaluate = fourEvaluate
  } else {
    ulPullEvaluate = fiveEvaluate
  }
  // 肌力比
  let fiveRateEvaluate = ''
  if (fiveRateScore < 4) {
    fiveRateEvaluate = oneEvaluate
  } else if (fiveRateScore >= 4 && fiveRateScore < 5) {
    fiveRateEvaluate = twoEvaluate
  } else if (fiveRateScore >= 5 && fiveRateScore < 7) {
    fiveRateEvaluate = threeEvaluate
  } else if (fiveRateScore >= 7 && fiveRateScore < 8) {
    fiveRateEvaluate = fourEvaluate
  } else {
    fiveRateEvaluate = fiveEvaluate
  }

  /* 上肢：外展 */
  // 上肢左外展
  let ulLeftAbducentEvaluate = ''
  if (ulLeftAbducentScore < 4) {
    ulLeftAbducentEvaluate = oneEvaluate
  } else if (ulLeftAbducentScore >= 4 && ulLeftAbducentScore < 5) {
    ulLeftAbducentEvaluate = twoEvaluate
  } else if (ulLeftAbducentScore >= 5 && ulLeftAbducentScore < 7) {
    ulLeftAbducentEvaluate = threeEvaluate
  } else if (ulLeftAbducentScore >= 7 && ulLeftAbducentScore < 8) {
    ulLeftAbducentEvaluate = fourEvaluate
  } else {
    ulLeftAbducentEvaluate = fiveEvaluate
  }
  // 上肢右外展
  let ulRightAbducentEvaluate = ''
  if (ulRightAbducentScore < 4) {
    ulRightAbducentEvaluate = oneEvaluate
  } else if (ulRightAbducentScore >= 4 && ulRightAbducentScore < 5) {
    ulRightAbducentEvaluate = twoEvaluate
  } else if (ulRightAbducentScore >= 5 && ulRightAbducentScore < 7) {
    ulRightAbducentEvaluate = threeEvaluate
  } else if (ulRightAbducentScore >= 7 && ulRightAbducentScore < 8) {
    ulRightAbducentEvaluate = fourEvaluate
  } else {
    ulRightAbducentEvaluate = fiveEvaluate
  }
  // 肌力比
  let sixRateEvaluate = ''
  if (sixRateScore < 4) {
    sixRateEvaluate = oneEvaluate
  } else if (sixRateScore >= 4 && sixRateScore < 5) {
    sixRateEvaluate = twoEvaluate
  } else if (sixRateScore >= 5 && sixRateScore < 7) {
    sixRateEvaluate = threeEvaluate
  } else if (sixRateScore >= 7 && sixRateScore < 8) {
    sixRateEvaluate = fourEvaluate
  } else {
    sixRateEvaluate = fiveEvaluate
  }

  /* 下肢：后伸 */
  // 下肢左后伸
  let llAfterLeftOutEvaluate = ''
  if (llAfterLeftOutScore < 4) {
    llAfterLeftOutEvaluate = oneEvaluate
  } else if (llAfterLeftOutScore >= 4 && llAfterLeftOutScore < 5) {
    llAfterLeftOutEvaluate = twoEvaluate
  } else if (llAfterLeftOutScore >= 5 && llAfterLeftOutScore < 7) {
    llAfterLeftOutEvaluate = threeEvaluate
  } else if (llAfterLeftOutScore >= 7 && llAfterLeftOutScore < 8) {
    llAfterLeftOutEvaluate = fourEvaluate
  } else {
    llAfterLeftOutEvaluate = fiveEvaluate
  }
  // 下肢右后伸
  let llAfterRightOutEvaluate = ''
  if (llAfterRightOutScore < 4) {
    llAfterRightOutEvaluate = oneEvaluate
  } else if (llAfterRightOutScore >= 4 && llAfterRightOutScore < 5) {
    llAfterRightOutEvaluate = twoEvaluate
  } else if (llAfterRightOutScore >= 5 && llAfterRightOutScore < 7) {
    llAfterRightOutEvaluate = threeEvaluate
  } else if (llAfterRightOutScore >= 7 && llAfterRightOutScore < 8) {
    llAfterRightOutEvaluate = fourEvaluate
  } else {
    llAfterRightOutEvaluate = fiveEvaluate
  }
  // 肌力比
  let sevenRateEvaluate = ''
  if (sevenRateScore < 4) {
    sevenRateEvaluate = oneEvaluate
  } else if (sevenRateScore >= 4 && sevenRateScore < 5) {
    sevenRateEvaluate = twoEvaluate
  } else if (sevenRateScore >= 5 && sevenRateScore < 7) {
    sevenRateEvaluate = threeEvaluate
  } else if (sevenRateScore >= 7 && sevenRateScore < 8) {
    sevenRateEvaluate = fourEvaluate
  } else {
    sevenRateEvaluate = fiveEvaluate
  }

  /* 下肢：外展 */
  // 下肢左外展
  let llLeftAbducentEvaluate = ''
  if (llLeftAbducentScore < 4) {
    llLeftAbducentEvaluate = oneEvaluate
  } else if (llLeftAbducentScore >= 4 && llLeftAbducentScore < 5) {
    llLeftAbducentEvaluate = twoEvaluate
  } else if (llLeftAbducentScore >= 5 && llLeftAbducentScore < 7) {
    llLeftAbducentEvaluate = threeEvaluate
  } else if (llLeftAbducentScore >= 7 && llLeftAbducentScore < 8) {
    llLeftAbducentEvaluate = fourEvaluate
  } else {
    llLeftAbducentEvaluate = fiveEvaluate
  }
  // 下肢右外展
  let llRightAbducentEvaluate = ''
  if (llRightAbducentScore < 4) {
    llRightAbducentEvaluate = oneEvaluate
  } else if (llRightAbducentScore >= 4 && llRightAbducentScore < 5) {
    llRightAbducentEvaluate = twoEvaluate
  } else if (llRightAbducentScore >= 5 && llRightAbducentScore < 7) {
    llRightAbducentEvaluate = threeEvaluate
  } else if (llRightAbducentScore >= 7 && llRightAbducentScore < 8) {
    llRightAbducentEvaluate = fourEvaluate
  } else {
    llRightAbducentEvaluate = fiveEvaluate
  }
  // 肌力比
  let eightRateEvaluate = ''
  if (eightRateScore < 4) {
    eightRateEvaluate = oneEvaluate
  } else if (eightRateScore >= 4 && eightRateScore < 5) {
    eightRateEvaluate = twoEvaluate
  } else if (eightRateScore >= 5 && eightRateScore < 7) {
    eightRateEvaluate = threeEvaluate
  } else if (eightRateScore >= 7 && eightRateScore < 8) {
    eightRateEvaluate = fourEvaluate
  } else {
    eightRateEvaluate = fiveEvaluate
  }

  /* 下肢：内收 */
  // 下肢左内收
  let llLeftInsideCollectEvaluate = ''
  if (llLeftInsideCollectScore < 4) {
    llLeftInsideCollectEvaluate = oneEvaluate
  } else if (llLeftInsideCollectScore >= 4 && llLeftInsideCollectScore < 5) {
    llLeftInsideCollectEvaluate = twoEvaluate
  } else if (llLeftInsideCollectScore >= 5 && llLeftInsideCollectScore < 7) {
    llLeftInsideCollectEvaluate = threeEvaluate
  } else if (llLeftInsideCollectScore >= 7 && llLeftInsideCollectScore < 8) {
    llLeftInsideCollectEvaluate = fourEvaluate
  } else {
    llLeftInsideCollectEvaluate = fiveEvaluate
  }
  // 下肢右内收
  let llRightInsideCollectEvaluate = ''
  if (llRightInsideCollectScore < 4) {
    llRightInsideCollectEvaluate = oneEvaluate
  } else if (llRightInsideCollectScore >= 4 && llRightInsideCollectScore < 5) {
    llRightInsideCollectEvaluate = twoEvaluate
  } else if (llRightInsideCollectScore >= 5 && llRightInsideCollectScore < 7) {
    llRightInsideCollectEvaluate = threeEvaluate
  } else if (llRightInsideCollectScore >= 7 && llRightInsideCollectScore < 8) {
    llRightInsideCollectEvaluate = fourEvaluate
  } else {
    llRightInsideCollectEvaluate = fiveEvaluate
  }
  // 肌力比
  let nineRateEvaluate = ''
  if (nineRateScore < 4) {
    nineRateEvaluate = oneEvaluate
  } else if (nineRateScore >= 4 && nineRateScore < 5) {
    nineRateEvaluate = twoEvaluate
  } else if (nineRateScore >= 5 && nineRateScore < 7) {
    nineRateEvaluate = threeEvaluate
  } else if (nineRateScore >= 7 && nineRateScore < 8) {
    nineRateEvaluate = fourEvaluate
  } else {
    nineRateEvaluate = fiveEvaluate
  }

  /* 返回结果 */
  return {
    cvRearProtractionEvaluate,
    cvAnteflexionEvaluate,
    oneRateEvaluate,

    cvLeftSideEvaluate,
    cvRightSideEvaluate,
    twoRateEvaluate,

    tRearProtractionEvaluate,
    tAnteflexionEvaluate,
    threeRateEvaluate,

    tLeftSideEvaluate,
    tRightSideEvaluate,
    fourRateEvaluate,

    ulPushEvaluate,
    ulPullEvaluate,
    fiveRateEvaluate,

    ulLeftAbducentEvaluate,
    ulRightAbducentEvaluate,
    sixRateEvaluate,

    llAfterLeftOutEvaluate,
    llAfterRightOutEvaluate,
    sevenRateEvaluate,

    llLeftAbducentEvaluate,
    llRightAbducentEvaluate,
    eightRateEvaluate,

    llLeftInsideCollectEvaluate,
    llRightInsideCollectEvaluate,
    nineRateEvaluate
  }
}
