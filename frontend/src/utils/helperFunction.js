// eslint-disable-next-line no-useless-escape
export const checkEmailAddress = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
