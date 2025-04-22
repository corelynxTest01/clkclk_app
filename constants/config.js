const config = {
  tiny_apiKey: "er236eypg0uaukqmzthzi8zk7q94ulwlx3twqgj1jewupby2",
  defaultTimeout: 4000, // In milisecond
  recordCountInList: 10,
  bufferData: 20,
  apiDataLimit: 10,
  dropDownDataLimit: 100,
  maxWordLimit: 100,
  socket_polling_time: 45000000,
  superAdminId: "5e44ead556d205dfd7ef660a",
  defaultTranId: "660bde5c09a611acf6cc75de",
  superAdminUserId: "5f0629343dacc32134a321ef",
  secretKey: "clkclk AnneKlein 109",
  dateFormat: "MM/DD/YYYY",
  paymentMethod: ["cash", "card"],
  member_redirect_after_login: "/myProfile",
  creditCode: {
    quick: "677cb89f4811a",
    detail: "677cb89au9p2b",
    voucher: "677fb0glf9r3c",
    giftLoyalty: "677cb0acf9z4d",
    shareLoyalty: "677cb0acf9z5e",
    earnLoyalty: "677cb0acf9z16f",
  },
  listReturnFields: {
    members: "firstName,lastName,email,phone,clique,qbClique",
    products: "name,price,sku,createFrom",
    tenants: "name,phone,email,status",
    cliques: "name,keyword,type,isPrimary",
    users: "firstName,lastName,role,phone,email,clique",
    vouchers:
      "title,body,maxValue,vLength,image,freeProduct,createdDate,voucherTemplate,freeProduct,type,clique,tenantId,createdBy",
    programs:
      "title,startDate,endDate,status,level,productId,purchaseRequireQuantity,maxOff,voucher,vouchers,clique,tenantId,createdBy,createdDate,modifiedDate",
  },
  formReturnFields: {
    members:
      "firstName,lastName,email,phone,tenant,gender,birthDate,clique,customerId",
    products: "name,price,sku,category,clique,type,description",
    tenants: "name,phone,email",
    cliques: "name,keyword,type",
    users: "firstName,lastName,role,phone,email,clique",
    vouchers:
      "title,body,maxValue,vLength,image,freeProduct,createdDate,voucherTemplate,freeProduct,type,clique,tenantId,createdBy",
    programs:
      "title,startDate,endDate,status,level,productId,purchaseRequireQuantity,maxOff,voucher,vouchers,clique,tenantId,createdBy,createdDate,modifiedDate",
  },
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  },
  genderOptions: [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
    { name: "Other", value: "Other" },
  ],
  status: [
    { name: "Active", value: "Active" },
    { name: "Inactive", value: "Inactive" },
  ],
  reviewOptions: ["service", "price", "quality", "value", "vibe"],
  role: [
    { id: "5f0235f2cabbfdd2661a0d23", name: "superadmin" },
    { id: "5f023619cabbfdd2661a0d37", name: "admin" },
    { id: "5f102ac91b3eab9f90b81f8b", name: "manager" },
    { id: "5f023627cabbfdd2661a0d3c", name: "employee" },
  ],
  programType: [
    { id: "all", name: "all programs" },
    { id: "simpleloyalty", name: "simple loyalty" },
    { id: "birthday", name: "birthday" },
    { id: "letitride", name: "let it ride" },
    { id: "referral", name: "referral" },
    { id: "welcome", name: "welcome" },
    { id: "datedriven", name: "date loyalty" },
  ],
  voucherLength: [
    { id: 6, name: "6 digits" },
    { id: 9, name: "9 digits" },
    { id: 12, name: "12 digits" },
  ],
  voucherExp: [
    { id: "10", name: "10 days" },
    { id: "30", name: "30 days" },
    { id: "60", name: "60 days" },
    { id: "90", name: "90 days" },
  ],
  voucherType: [
    { id: "all", name: "all eRewards" },
    { id: "dollar", name: "dollar" },
    { id: "product", name: "product" },
    { id: "service", name: "service" },
  ],
  loyalty: [{ id: 1, name: "dollar" }],
  communication: [
    { id: "ereview", name: "eReview" },
    { id: "ereply", name: "eReply" },
  ],
  sortBy: [
    { id: "recent", name: "most recent" },
    { id: "oldest", name: "oldest" },
    { id: "lowest", name: "lowest" },
    { id: "highest", name: "highest" },
  ],
  viewBy: [
    { id: "positive", name: "positive" },
    { id: "negative", name: "negative" },
    { id: 5, name: "5 star" },
    { id: 4, name: "4 star" },
    { id: 3, name: "3 star" },
    { id: 2, name: "2 star" },
    { id: 1, name: "1 star" },
  ],
  currencyOption: [{ id: "usd", name: "dollar" }],
  profileReqFields: [
    "firstName",
    "lastName",
    "empCode",
    "password",
    "status",
    "role",
  ],
  userReqFields: [
    "firstName",
    "lastName",
    "phone",
    "email",
    "birthDate",
    "empCode",
    "password",
    "status",
    "role",
  ],
  cliqueReqFields: [
    "name",
    "phone",
    "email",
    "keyword",
    "city",
    "zip",
    "state",
  ],
  merchantReqFields: [
    "name",
    "ownerFirstName",
    "ownerLastName",
    "phone",
    "email",
    "zip",
  ],
  memberReqFields: [
    "firstName",
    "lastName",
    "phone",
    "email",
    "birthDate",
    "password",
    "zip",
    "gender",
  ],
  voucherReqFields: ["title", "vLength", "type"],
  clubReqFields: ["title", "startDate", "endDate"],
  productReqFields: ["name", "sku", "price", "type"],
  letitrideReqFields: ["title", "startDate", "endDate"],
  datedrivenReqFields: ["title", "voucher", "clique", "startDate"],
  simpleloyaltyReqFields: [
    "title",
    "voucher",
    "productId",
    "clique",
    "startDate",
    "endDate",
  ],
  transReqFields: [
    "clique",
    "createdBy",
    "employee",
    "member",
    "modifiedBy",
    "tenant",
  ],
  notification: {
    user: [
      { id: "66793ed3bad97e1042dab193", name: "all notifications" },
      { id: "66683b516899414c0f7eefd6", name: "Reward Redemption Request" },
      { id: "66683b156899414c0f7eefd4", name: "eReview" },
    ],
    member: [
      { id: "66793ed3bad97e1042dab193", name: "all notifications" },
      { id: "6668271a0d1c182b4407b862", name: "Gift" },
      { id: "66683b326899414c0f7eefd5", name: "eReply" },
    ],
  },
  templateType: [
    { id: "667937f3bad97ea0c2dab186", name: "eReview email" },
    { id: "66793b55bad97ec9c4dab18a", name: "eReply email" },
    { id: "66793a9dbad97e1a73dab188", name: "eReceipt email" },
    { id: "66793bf1bad97ecc92dab18b", name: "eRefer email" },
    { id: "66793da1bad97eed14dab18f", name: "welcome email" },
    { id: "66793e50bad97e18a0dab191", name: "birthday email" },
  ],
  democliqueOptions: [
    {
      "id": "677540f7bdb48405a23c45e8",
      "name": "Corelynx Kolkata",
      "website": "https://clkclk.com",
      "city": "kolkata",
      "state": "Alaska",
      "zip": "15444",
      "country": "United States",
      "address": {
        "address1": "Kolkata",
        "address2": "Kolkata02"
      },
      "facebook": "https://www.facebook.com/",
      "twitter": "https://x.com/",
      "instagram": "https://www.instagram.com/",
      "image": "https://clkclkassets.s3.amazonaws.com/tenants/4030a477-3cdb-4ad4-b6ff-6bf71c71ecd8_hyundai.png",
      "tenantId": "677540f7bdb48405a23c45e6",
      "description": "Clkclk kolkata",
      "loyalty": ""
    }
  ]
};
export default config;
