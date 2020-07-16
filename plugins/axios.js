export default function ({ $axios, redirect }, inject) {
  // axios instance $refinery
  const legacy = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })
  legacy.setBaseURL('https://api.gas.dev/legacy')
  inject('legacy', legacy)

  // axios instance $api
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })
  api.setBaseURL('https://api.gas.dev')
  inject('api', api)
}
