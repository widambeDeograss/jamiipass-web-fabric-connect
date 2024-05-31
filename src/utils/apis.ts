import { baseUrl } from "./baseUrl"

export const authUrls = {
    registerCorporate: baseUrl + "/app/corp/auth/register",
    loginCorporate: baseUrl + "/app/corp/auth/login",
    verifyEmail: baseUrl + "/app/corp/verify/",
    verifyEmailOrg: baseUrl + "/app/org/verify/",
    verifyOtpCorp: baseUrl + "/app/corp/auth/verify_corp_otp",
    logoutCorporate: baseUrl + "/app/corp/auth/logout",
    loginOrganization: baseUrl + "/app/org/auth/login",
    verifyOtpOrganization: baseUrl + "/app/org/auth/verify_org_otp",
}

export const corporateUrls = {
    corporateInfo: baseUrl + "/app/corp/corp_info",
    corporates: baseUrl + "/app/corp/all_corporates",
    corporateCreateShare: baseUrl + "/app/corp/share_id",
    corporateShareHistory: baseUrl + "/app/corp/share_history",
    corporateShareInfo: baseUrl + "/app/corp/get_shared_ids",  
}
export const organizationUrls = {
    organizationInfo: baseUrl + "/app/org/org_info",
    organizations: baseUrl + "/app/org/all_orgs",
    organizationCreateIdentity: baseUrl + "/app/org/create_identification",
    organizationIdentities: baseUrl + "/app/org/all_identifications",
    organizationIdentityReguests: baseUrl + "/app/org/all_identification_requests",
    organizationIdentityReguestInfo: baseUrl + "/app/org/identification_request",
    organizationCreateIdentityReguest: baseUrl + "/app/org/create_identification_request",
}

export const networkUrls = {
    connectToNetwork:baseUrl + "/users/login",
    addCertToNtwork:baseUrl + "/channels/mychannel/chaincodes/id",
    changeRequestStatus:baseUrl + "/app/org/update_user_card_request"
}