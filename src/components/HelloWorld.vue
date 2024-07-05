<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="kycInitiateMethod()">Start KYC</button>
    <p v-if="userData">{{ userData }}</p>
    <p>ID Token: {{ idToken }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data(){
    return{
      userData:'',
      idToken:''
    }
  },
  props: {
    msg: String,
  },
  methods: {
   async kycInitiateMethod() {
      // const presentationRequest = {
      //   query: [
      //     {
      //       type: "QueryByExample",
      //       credentialQuery: [
      //         {
      //           example: {
      //             type: "PersonhoodCredential",
      //             credentialSchema: {
      //               id: "sch:hid:testnet:z6Mkvtd73dDgg7HU8wLCmXbe2RAHPAU1Ex1VUXCFtPV7u36i:1.0",
      //             },
      //           },
      //           trustedIssuer: [
      //             {
      //               required: true,
      //               issuer:
      //                 "did:hid:testnet:d5e185c4-1952-4af1-856d-61e05abf48c7",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       type: "QueryByExample",
      //       credentialQuery: [
      //         {
      //           example: {
      //             type: "PassportCredential",
      //             credentialSchema: {
      //               id: "sch:hid:testnet:z6MkgMXXQL7YD7BufNLbjrwueoj4nmih9xujJ6aozJDmzFWx:1.0",
      //             },
      //           },
      //           trustedIssuer: [
      //             {
      //               required: true,
      //               issuer:
      //                 "did:hid:testnet:d5e185c4-1952-4af1-856d-61e05abf48c7",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      //   reason: "The verifier app need access of your data",
      //   issuerDID: "did:hid:testnet:d5e185c4-1952-4af1-856d-61e05abf48c7",
      //   issuerDIDVerificationMethod:
      //     "did:hid:testnet:d5e185c4-1952-4af1-856d-61e05abf48c7#key-1",
      //   domain: window.location.href,
      //   logoUrl: "https://media.licdn.com/dms/image/C560BAQHaV-EkCDGGsQ/company-logo_200_200/0/1630617949359?e=2147483647&v=beta&t=6GBP5DSyWxFuFWvQicwxZF3ksK29jbv4lIdr_tjfnCo",
      // };
      // stringifying it
      const self = this;
      // const presentationRequestStr = JSON.stringify(presentationRequest);
      // converting it in base64 string
      // const base64EncodedPr = btoa(presentationRequestStr);
      const cavachAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjEzZjcxMmZkOTM0N2E3MzU2MjI4MzE2OGE2MDk3ZWUxMzhkNSIsInVzZXJJZCI6Ijc3ZWU5N2MxLTIyNTItNGJlYy1hZTdlLTM3MTYyYTEyZDk4MyIsImdyYW50VHlwZSI6ImFjY2Vzc19zZXJ2aWNlX2t5YyIsImttc0lkIjoiaHM6ZG9jOi05YWl2cDh6NWZrYW1wM2ZwOHpfNnpmZHR4dWF0aWhydDY2X3gtdGxmeXciLCJ3aGl0ZWxpc3RlZENvcnMiOlsiKiJdLCJzdWJkb21haW4iOiJlbnQtZjJmMzIzNiIsImVkdklkIjoiaHM6ZGV2ZWxvcGVyLWRhc2hib2FyZDphcHA6MTNmNzEyZmQ5MzQ3YTczNTYyMjgzMTY4YTYwOTdlZTEzOGQ1IiwiYWNjZXNzTGlzdCI6WyJSRUFEX1VTRVJfQ09OU0VOVCIsIldSSVRFX1VTRVJfQ09OU0VOVCIsIldSSVRFX1NFU1NJT04iLCJBTEwiLCJXUklURV9QQVNTSVZFX0xJVkVMSU5FU1MiLCJXUklURV9ET0NfT0NSIl0sImlhdCI6MTcxOTI5NTI0OSwiZXhwIjoxNzI0MzM1MjQ5fQ.-5WKTPUpAwl_ptZCrJdjrgQ2wHGkPDx7hPAxFyv9wZQ"
      const ssiAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjNlNTdkMzBhNzU3ZWVhNWY0ZDcxMGM0MDE2ZTgzZDRhNzZiNiIsInVzZXJJZCI6Ijc3ZWU5N2MxLTIyNTItNGJlYy1hZTdlLTM3MTYyYTEyZDk4MyIsImdyYW50VHlwZSI6ImFjY2Vzc19zZXJ2aWNlX3NzaSIsImttc0lkIjoiaHM6ZG9jOnhjcWN4azNycnQzYjJxc3U5Z2c4cXRxeC1sdG54bjg5cTNsMnNvdml6cWUiLCJ3aGl0ZWxpc3RlZENvcnMiOlsiKiJdLCJzdWJkb21haW4iOiJlbnQtYjFkMWM4YSIsImVkdklkIjoiaHM6ZGV2ZWxvcGVyLWRhc2hib2FyZDphcHA6M2U1N2QzMGE3NTdlZWE1ZjRkNzEwYzQwMTZlODNkNGE3NmI2IiwiYWNjZXNzTGlzdCI6WyJBTEwiXSwiaWF0IjoxNzE5Mjk1Mjg5LCJleHAiOjE3MjQzMzUyODl9.ndlTSQkC96qLswDbRkopL8jIG4Zci0CWPGFhXLrTA_k"

      // Generate the Session ID 
      const sessionId = await this.fetchNewKYCSession()
      console.log(sessionId,'Session ID')
      const widgetBaseUrl = `https://verify.hypersign.id/`
      const widgetUrl = `${widgetBaseUrl}?kycAccessToken=${cavachAccessToken}&ssiAccessToken=${ssiAccessToken}&sessionId=${sessionId}`
      // const widgetUrl = `https://verify.hypersign.id/?kycAccessToken=${kycAccessToken}&ssiAccessToken=${ssiAccessToken}`;
      window.open(widgetUrl, "Popup Window", "width=850,height=870");

      window.addEventListener('message', async function (event) {
    if (event.origin === 'https://verify.hypersign.id') {
        console.log('Received message from popup:', event.data);
        // make sure to parse the data before use
        const data = JSON.parse(event.data)
        
        // we send these 3 vaules: 
        // status = success / fail, 
        // idToken = you will use this token to extract user's data
        // message = a simple message (if any)
        const { status, idToken, message} = data;
        self.idToken = idToken;
        console.log(idToken)
        console.log(message)
        if (status === 'success') {
            console.log('Successfully finished the KYC')
            // https://ent-4c71874.api.cavach.hypersign.id/api/v1/e-kyc/verification/user-consent?idToken=${idToken}
            const url = `https://ent-f2f3236.api.cavach.hypersign.id/api/v1/e-kyc/verification/user-consent?idToken=${idToken}`
            const getUserKYCData = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${cavachAccessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await getUserKYCData.json()
            this.userData = data
            console.log(getUserKYCData)
        }
        else if (status === 'fail') {
            console.log('Failed to finish KYC')
        }
    }
});

    },
    async fetchNewKYCSession() {
      const kycTenantUrl = `https://ent-f2f3236.api.cavach.hypersign.id`
      const kycSessionPath = `/api/v1/e-kyc/verification/session`
            try {
                const url = `${kycTenantUrl}${kycSessionPath}`
                const headers = {
                    'Authorization': 'Bearer ' + `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjEzZjcxMmZkOTM0N2E3MzU2MjI4MzE2OGE2MDk3ZWUxMzhkNSIsInVzZXJJZCI6Ijc3ZWU5N2MxLTIyNTItNGJlYy1hZTdlLTM3MTYyYTEyZDk4MyIsImdyYW50VHlwZSI6ImFjY2Vzc19zZXJ2aWNlX2t5YyIsImttc0lkIjoiaHM6ZG9jOi05YWl2cDh6NWZrYW1wM2ZwOHpfNnpmZHR4dWF0aWhydDY2X3gtdGxmeXciLCJ3aGl0ZWxpc3RlZENvcnMiOlsiKiJdLCJzdWJkb21haW4iOiJlbnQtZjJmMzIzNiIsImVkdklkIjoiaHM6ZGV2ZWxvcGVyLWRhc2hib2FyZDphcHA6MTNmNzEyZmQ5MzQ3YTczNTYyMjgzMTY4YTYwOTdlZTEzOGQ1IiwiYWNjZXNzTGlzdCI6WyJSRUFEX1VTRVJfQ09OU0VOVCIsIldSSVRFX1VTRVJfQ09OU0VOVCIsIldSSVRFX1NFU1NJT04iLCJBTEwiLCJXUklURV9QQVNTSVZFX0xJVkVMSU5FU1MiLCJXUklURV9ET0NfT0NSIl0sImlhdCI6MTcxOTI5NTI0OSwiZXhwIjoxNzI0MzM1MjQ5fQ.-5WKTPUpAwl_ptZCrJdjrgQ2wHGkPDx7hPAxFyv9wZQ`,
                    'content-type': 'application/json',
                }
                const resp = await fetch(url, {
                    method: 'POST',
                    headers
                })
                const json = await resp.json()
                console.log(json,'sessionId')
                return json.sessionId;
            } catch (e) {
                console.error(e)
            }
        }     
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
