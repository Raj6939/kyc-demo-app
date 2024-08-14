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
      kycAccessToken:'', //put kycAccessToken you received from KYC Service
      ssiAccessToken:'' //put ssiAccessToken you received from KYC Service
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
            const url = `<kyc_server_base_url>/api/v1/e-kyc/verification/user-consent?idToken=${idToken}`
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
      const kycTenantUrl = `<kyc_server_base_url>`
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
