class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headerJSON = {'Content-Type': 'application/json'}
  }

  queryHandler(url, method = 'GET', obj) {
    let fetchConfig = {
      method: method,
      headers: this._headerJSON
    }

    if(obj) {
      fetchConfig = {
        method: method,
        headers: this._headerJSON,
        body: JSON.stringify(obj)
      }
    }
    
    return (fetch(`${this._baseUrl}/${url}`, fetchConfig)
      .then((res) => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      })
    );
  }

  registerUser(email, password) {
    return this.queryHandler('signup', 'POST', {email: email, password: password});
  }

  authUser(email, password) {
    return this.queryHandler('signin', 'POST', {email: email, password: password});
  }

  setAuthToken(token) {
    this._headerJSON = {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  }

  getUserEmail() {
    return this.queryHandler('users/me', 'GET');
  }
}
export const authApi = new AuthApi({baseUrl:'https://api.mesto.petrov.nomoredomains.xyz'});
