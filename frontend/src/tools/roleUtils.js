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

export const canReview1 = (role, config, thesis) => {
    return role === MEMBER && config.authorization === thesis.reviews.review1.reviewerId
}