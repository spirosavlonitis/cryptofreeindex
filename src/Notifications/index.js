import React from 'react';
import Notification  from 'react-web-notification/lib/components/Notification';
import axios from 'axios';
import Image from 'react-bootstrap/lib/Image';
import "./index.css";
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';


class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.coins = props.coins;
    const targetPrices = {};
    this.coins.forEach( coin => {
      targetPrices[coin.id] = {above: undefined, below: undefined, on: false}
    } )
    

    this.state = {
      ignore: true,
      title: '',
      options: {
        lang: 'en',
        dir: 'ltr',
        sound: '/sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
      },
      targetPrices
    };

    this.coinPrices = {};
    this.api_key = "a63f5a0b90417a8c7dd8a72c4245176dee7288e9890642f1175835f65b04a523"

    this.apiURL ="https://min-api.cryptocompare.com/data/pricemulti?fsyms="+props.navCoins.join()+
                 "&tsyms=USD&api_key="+this.api_key
  }

  handlePermissionGranted(){
    //Permission Granted
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    //Permission Denied
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    //Web Notification not Supported
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
//    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
  //  console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
    this.playSound();
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

  handleButtonClick = () => {
    const {ignore, targetPrices} = this.state
    if(ignore)
      return;
    console.log(targetPrices['ETC'], this.coinPrices['ETC']);
    let title = ''
    for (let targetCoin in targetPrices)  {
        if (targetPrices[targetCoin].on === false)
          continue;
        if (this.coinPrices[targetCoin] > targetPrices[targetCoin].above
          || this.coinPrices[targetCoin] < targetPrices[targetCoin].below) {
            
            title = targetCoin;            
            let body;
            if (this.coinPrices[targetCoin] > targetPrices[targetCoin].above){
              body = targetCoin+' above $ '+targetPrices[targetCoin].above
            }else{
              body = targetCoin+' below $ '+targetPrices[targetCoin].below
            }
            
            let icon;
            this.coins.forEach( coin => {
              if (coin.id === targetCoin)
                icon = "/images/"+coin.image
            } )

            const tag = Date.now();
            // Available options
            // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
            const options = {
              tag,
              body,
              icon,
            }
            this.setState({
              title,
              options,
            });          
          }
    }
  }

  getUSDPrices() {
    axios.get(this.apiURL).then(res => {
        for (let coin in res.data)
          this.coinPrices[coin] = res.data[coin]['USD']
    })    
  }

  checkForNotif = () => {
       this.handleButtonClick()
  }

  handleOnAboveChange = (e, coin) => {
    const {targetPrices} = this.state;
    targetPrices[coin.id]['above'] = e.target.value;
    this.setState({
      targetPrices
    })
  }
  
  handleOnBelowChange = (e, coin) => {
    const {targetPrices} = this.state;
    targetPrices[coin.id]['below'] = e.target.value;
    this.setState({
      targetPrices
    })
  }

  setNotify = (e ,coin) => {
    const {targetPrices} = this.state;
    targetPrices[coin].on = !targetPrices[coin].on
    this.setState({
      targetPrices
    })
  }

  componentDidMount() {
    this.getUSDPrices()
    this.notifInterval = setInterval(this.checkForNotif, 65000);
    this.setPrices = setInterval(this.getUSDPrices.bind(this), 60000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.setPrices);
  }

  render() {
    const {title, options, ignore, targetPrices} = this.state    
    return (
      <div>
        <button onClick={this.handleButtonClick}>Notif!</button>
        {
          this.coins.slice(7, 8).map(coin => 
            <div>
              <div class="post-container">                
                <div class="post-thumb"><Image src={"/images/"+coin.image} className="notifImage" /></div>
                <div class="post-content">
                    <Form>
                      <FormGroup>
                        <ControlLabel className="post-title" >Above</ControlLabel>
                        <FormControl
                          value={targetPrices[coin.id].above}
                          placeholder={this.coinPrices[coin.id]}
                          onChange={ (e) => this.handleOnAboveChange(e, coin)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel className="post-title" >Below</ControlLabel>
                        <FormControl
                          value={targetPrices[coin.id].below}
                          placeholder={this.coinPrices[coin.id]}
                          onChange={ (e) => this.handleOnBelowChange(e, coin)}
                        />
                      </FormGroup>
                    </Form>
                    <div>
                      <ControlLabel className="switchLabel" >Notify</ControlLabel>
                      <label className="switch">
                        <input type="checkbox" />
                      </label>
                      <b className="switchText" >OFF</b>
                      <label className="switch">
                        <input type="checkbox"
                          onClick={ (event) => this.setNotify(event, coin.id)}
                        />
                        <span className="slider round"></span>
                      </label>
                      <b className="switchText" >ON</b>
                    </div>
                </div>
              </div>
              <br/><br/>
            </div>
          )
        }
        <Notification
          ignore={ignore && title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={10000}
          title={title}
          options={options}
        />
      </div>
    )
  }
};

export default Notifications