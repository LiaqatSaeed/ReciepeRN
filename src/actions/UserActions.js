const setUser = UserObj => ({
  type: 'SET_USER',
  Info: UserObj,
});

const setToken = UserObj => ({
  type: 'SET_TOKEN',
  Info: UserObj,
});

const getUserObj = (response, isToken) => {
  return {
    token_type: isToken ? response.token_type : '',
    access_token: isToken ? response.access_token : '',
    CustomerID: response.CustomerID,
    FirstName: response.FirstName,
    LastName: response.LastName,
    City: response.City,
    Email: response.Email,
    State: response.State,
    Phone: response.Phone,
    DOB: response.DateOfBirth,
    Country: response.Country,
    SMSVerified:response.SMSVerified,
    VerificationCode:response.VerificationCode
  };
};

export { getUserObj, setUser };
