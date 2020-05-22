const STUDENT = "STUDENT"
const MEMBER = "MEMBER"
const CHAIRMAN = "CHAIRMAN"
const ADMIN = "ADMIN"

export const canChangeAbstractAndKeywords = role => {
    return [STUDENT, ADMIN].includes(role)
}

export const canUploadFile = role => {
    return [STUDENT, ADMIN].includes(role)
}

export const canReview1 = (thesis, config) => {
    return thesis.role === MEMBER && config.authorization === thesis.reviews.reviewer1.reviewerId
}

export const canReview2 = (thesis, config) => {
    return thesis.role === MEMBER && config.authorization === thesis.reviews.reviewer2.reviewerId
}

export const canSetDefended = (thesis) => {
    return thesis.role === CHAIRMAN
}