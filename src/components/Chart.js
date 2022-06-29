import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
//import StockData from "../assets/mock.json"

class Chart extends React.PureComponent {

  constructor(){
    super()
    this.state ={
      appleData:{},
      loadingStatus: false
    }
  }

    render(){

      let options = {
        title: {
          text: "AAPL"
        },
        series: [
          {
            data: this.state.appleData
          }
        ]
      };

      return(
        this.state.loadingStatus ?
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        </div>
        :
        <div>
          loading ...
        </div>
      )
    }

    componentDidMount(){
      this.getData()
    }
  
    getData(){
      let value = []
      /* let data = StockData["Time Series (Daily)"]
      data = res["Time Series (Daily)"]
      for (let i in data){
        let date = new Date(i)
        value?.unshift([date?.setUTCHours(0,0,0,0),Number (data[i]["4. close"])])
      }
      this.setState({
        appleData: value,
        loadingStatus: true
      }) */

      let data
      fetch("http://localhost:4200/rest/apple").then(function(response) {
        return response.json()
      }).then(res=>{
        data = res["Time Series (Daily)"]
        for (let i in data){
          let date = new Date(i)
          value?.unshift([date?.setUTCHours(0,0,0,0),Number (data[i]["4. close"])])
        }
        this.setState({
          appleData: value,
          loadingStatus: true
        })
      })
    }
  }
  
  export default Chart