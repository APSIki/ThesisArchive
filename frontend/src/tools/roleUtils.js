const STUDENT = "STUDENT"
const MEMBER = "MEMBER"
const CHAIRMAN = "CHAIRMAN"
const ADMIN = "ADMIN"

export const canChangeAbstractAndKeywords = thesis => {
    return thesis && [STUDENT, ADMIN].includes(thesis.role) && !thesis.defended
}

export const canUploadFile = role => {
    return [STUDENT].includes(role)
}

export const canReview1 = (thesis, config) => {
    return thesis.role === MEMBER && config.authorization == thesis.reviewer1.reviewerId
}

export const canReview2 = (thesis, config) => {
    return thesis.role === MEMBER && config.authorization == thesis.reviewer2.reviewerId
}

export const canSetDefended = (thesis) => {
    return thesis.role === CHAIRMAN
}

export const canSaveReview = (thesis) => {
    return !!thesis.filePath
}

export const canChangeCommittee = (thesis) => {
    return thesis.role === ADMIN
}

export const canEditReviewer = (thesis) => {
    return thesis.role === ADMIN
}

export const canAddNewThesis = (theses) => {
    console.log(theses.filter(thesis => thesis.role === "STUDENT").length)

    return theses.filter(thesis => thesis.role === "STUDENT").length > 0
}