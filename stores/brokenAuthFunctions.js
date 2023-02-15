const tokenClient = shallowRef(null);

  function initGapiClient() {
    const CLIENT_ID = '121663165487-dtef1h3on975351m5qk9c959a01pknff.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDDaKPdpxCKFKPU98fagwZLJVVPfaabmVU';
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar';

    const gapi = globalThis.gapi;
    function gapiLoaded() {
      gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      })
    }
    gapiLoaded();
    tokenClient.value = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: ''
    })
  }

  function setToken() {
    token.value = gapi.client.getToken();
  }

  function setAccessToken(value) {
    gapi.client.setToken(value);
    token.value = value;
  }

  function getAccessToken() {
    tokenClient.value.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      console.warn({ resp });
      setToken();
      await getUpcomingEvents();
    }
  
    setToken();
    if (token.value === null) {
      tokenClient.value.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.value.requestAccessToken({ prompt: '' });
    }
  }

  function handleLogout() {
    setToken();
    if (token.value !== null) {
      google.accounts.oauth2.revoke(token.value.access_token);
      gapi.client.setToken('');
    }
    token.value = null;
  }