<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="kycInitiateMethod()">Start KYC</button>
    <p>ID Token: {{ idToken }}</p>
    <p v-if="userData">User Data: {{ userData }}</p>    
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data(){
    return{
      userData:'',
      idToken:'',
      kycAccessToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjE5YjJmNzk0MGJiM2Q3Mzg5NTQ0MTkxZGEyYTRlNDM0YjlhYSIsInVzZXJJZCI6IjM5ZDg1MGQzLTljNTMtNDliNS1hZmM5LWQ5NzM1NWYxYTAzYSIsImdyYW50VHlwZSI6ImFjY2Vzc19zZXJ2aWNlX2t5YyIsImttc0lkIjoiaHM6ZG9jOi13ZnQ5M2UwYmN2ZGpuaWs4LWR5M2tkeHU0OHU3cGtzM3Fmc2J0bDBicmkiLCJ3aGl0ZWxpc3RlZENvcnMiOlsiKiIsImh0dHBzOi8vZW50aXR5LmRhc2hib2FyZC5oeXBlcnNpZ24uaWQiLCJodHRwczovL3ZlcmlmeS5oeXBlcnNpZ24uaWQiXSwic3ViZG9tYWluIjoiZW50LTRjMDc4M2UiLCJlZHZJZCI6ImhzOmRldmVsb3Blci1kYXNoYm9hcmQ6YXBwOjE5YjJmNzk0MGJiM2Q3Mzg5NTQ0MTkxZGEyYTRlNDM0YjlhYSIsImFjY2Vzc0xpc3QiOlsiUkVBRF9VU0VSX0NPTlNFTlQiLCJXUklURV9VU0VSX0NPTlNFTlQiLCJXUklURV9TRVNTSU9OIiwiQUxMIiwiV1JJVEVfUEFTU0lWRV9MSVZFTElORVNTIiwiV1JJVEVfRE9DX09DUiJdLCJlbnYiOiJkZXYiLCJhcHBOYW1lIjoiS1lDIE5ldyIsImlzc3VlckRpZCI6ImRpZDpoaWQ6dGVzdG5ldDphMjNlNDkzMy0xNmZhLTRjMzctOWVkMy1iNDA0Nzg5NDU3YTEiLCJkZXBlbmRlbnRTZXJ2aWNlcyI6WyJkYTgyMjM0OWY0MTIyMWQ2NGM2ZjU1NGE2NTIyZTBiZjZjZTIiXSwiaWF0IjoxNzI2NTU0NDYxLCJleHAiOjE3MzE3Mzg0NjF9.6gxtK0iqE8yHTs5osiG27thCqIcqKjKilFluT5ajDf0', //put kycAccessToken you received from KYC Service
      ssiAccessToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImRhODIyMzQ5ZjQxMjIxZDY0YzZmNTU0YTY1MjJlMGJmNmNlMiIsInVzZXJJZCI6IjM5ZDg1MGQzLTljNTMtNDliNS1hZmM5LWQ5NzM1NWYxYTAzYSIsImdyYW50VHlwZSI6ImFjY2Vzc19zZXJ2aWNlX3NzaSIsImttc0lkIjoiaHM6ZG9jOnUtaHNqMXI5ZXFyOWhrMWVyejkyeHBhcTRvdDgtdDNxZXlhem1tdjhfcnEiLCJ3aGl0ZWxpc3RlZENvcnMiOlsiKiIsImh0dHBzOi8vZW50aXR5LmRhc2hib2FyZC5oeXBlcnNpZ24uaWQiLCJodHRwczovL3ZlcmlmeS5oeXBlcnNpZ24uaWQiXSwic3ViZG9tYWluIjoiZW50LWQyNzc0NjAiLCJlZHZJZCI6ImhzOmRldmVsb3Blci1kYXNoYm9hcmQ6YXBwOmRhODIyMzQ5ZjQxMjIxZDY0YzZmNTU0YTY1MjJlMGJmNmNlMiIsImFjY2Vzc0xpc3QiOlsiQUxMIl0sImVudiI6ImRldiIsImFwcE5hbWUiOiJOZXcgU1NJIFNlcnZpY2UiLCJpYXQiOjE3MjY1NTQ0MzcsImV4cCI6MTczMTczODQzN30.Lm43xMbPw3IJzU3tzNjall8dYyjdHb3iMCIeB-Lwk5Y' //put ssiAccessToken you received from KYC Service
    }
  },
  props: {
    msg: String,
  },
  methods: {
   async kycInitiateMethod() {

      // Generate the Session ID 
      const sessionId = await this.fetchNewKYCSession()
      console.log(sessionId,'Session ID')
      const widgetBaseUrl = `https://verify.hypersign.id/`
      const widgetUrl = `${widgetBaseUrl}?kycAccessToken=${this.kycAccessToken}&ssiAccessToken=${this.ssiAccessToken}&sessionId=${sessionId}`      
      window.open(widgetUrl, "Popup Window", "width=850,height=870");
      const vm = this;
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
        vm.idToken= idToken
        console.log(idToken,"idToken")
        console.log(message)
        console.log(vm.kycAccessToken,"kycAccessToken")
        if (status === 'success') {
          console.log(vm.kycAccessToken)
            console.log('Successfully finished the KYC')            
            const url = `https://ent-4c0783e.api.cavach.hypersign.id/api/v1/e-kyc/verification/user-consent?idToken=${idToken}`
            const headers = {
                    'Authorization': 'Bearer ' + `${vm.kycAccessToken}`,
                    'content-type': 'application/json',
                }
            const getUserKYCData = await fetch(url, {
                method: 'GET',
                headers
            });
            const data = await getUserKYCData.json()
            vm.userData = data.data
            console.log(data)
        }
        else if (status === 'fail') {
            console.log('Failed to finish KYC')
        }
    }
});

    },
    async fetchNewKYCSession() {
      const kycTenantUrl = `https://ent-4c0783e.api.cavach.hypersign.id`
      const kycSessionPath = `/api/v1/e-kyc/verification/session`
            try {
                const url = `${kycTenantUrl}${kycSessionPath}`
                const headers = {
                    'Authorization': 'Bearer ' + `${this.kycAccessToken}`,
                    'content-type': 'application/json',
                }
                const resp = await fetch(url, {
                    method: 'POST',
                    headers
                })
                const json = await resp.json()
                console.log(json,'sessionId')
                return json.data.sessionId;
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
