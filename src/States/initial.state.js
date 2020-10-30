import contentState from './content.state'

const initialState = {  
  content: contentState,
  environment: {
    dev: {
      'bdmg-app': 'https://wwwd.bdmg.mg.gov.br/bdmg-app/api/rest-api/'
    },
    hom: {
      'bdmg-app': 'https://wwwd.bdmg.mg.gov.br/bdmg-app/api/rest-api/'
    },
    prod: {
      'bdmg-app': 'https://wwwd.bdmg.mg.gov.br/bdmg-app/api/rest-api/'
    },
    clickSign: {
      endpoint: 'https://sandbox.clicksign.com',
      origin: '*'
    }
  },
  language: 'ptBR',
  loading: false,
  sideMenu: false
}

export default initialState
