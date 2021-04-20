import serverTypeMap from "../Map/serverTypeMap";

export const timeTransToFrontend = (timeStr) =>{
  return timeStr.split('T')[0]
}

export const timeTransToBackend = (timeStr) =>{
  return `${timeStr}T00:00:00Z`
}

export const sexTransToFrontend = val =>{
  if(val === 1){
    return '男'
  }else {
    return '女'
  }
}

export const skillTransToBackend = (skills) => {
  let skills_tmp = skills[0];
  if (skills.length >= 2) {
    for (let i = 1; i < skills.length; i++) {
      skills_tmp += ('|' + skills[i])
    }
  }
  return skills_tmp
}

export const skillTransToFrontend = (skills) => {
  return skills.split('|')
}

export const houseTransToFrontend = (id) => {
  const tmp = (id+'').split("")
  return `${tmp[0]}单元${tmp[1] + tmp[2]}栋${tmp[3] + tmp[4] + tmp[5]}号`
}

export const typeTransToFrontend = (type) => {
  if(!type) return null
  type = type+''
  const type_tmp = parseInt(type.slice(0,1), 0)
  const subType_tmp = parseInt(type.slice(2,4), 0)
  const mainType = serverTypeMap[type_tmp - 1].label;
  const subType = serverTypeMap[type_tmp - 1].children[subType_tmp - 1].label
  return mainType+'-'+subType
}

export const timeTransToFrontendWithYYMMHHMM = (timeStr) => {
  const temp1 = timeStr.split('T')
  const temp2 = temp1[1].split('+')
  const yymm = temp1[0].slice(5,10)
  const hhmm = temp2[0].slice(0,5)
  return `${yymm} ${hhmm}`
}

export const skillListToFrontend = (skillsStr) => {
  const tmp = skillsStr.split('|').map(item=>{
    const typeStr = serverTypeMap[parseInt(item, 0)-1].label
    return typeStr
  })
  return tmp.join(' | ')
}
