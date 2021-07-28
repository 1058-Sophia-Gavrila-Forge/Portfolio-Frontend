export const url = process.env.NODE_ENV === 'production'
    ? 'http://t2backend-forge-backend'
    : 'http://localhost:8081'

export const aboutMeUrl = url + "/aboutMe"
export const portfolioUrl = url + "/portfolios"
export const educationUrl = url + "/education"
export const honorUrl = url + "/honor"
export const equivUrl = url + "/equiv"
export const workHistoryUrl = url + "/workhistory"
export const projectUrl = url + "/projects"
export const workExperienceUrl = url + "/workexperience"
