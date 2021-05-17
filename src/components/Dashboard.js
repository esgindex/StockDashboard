import React, { Component } from "react";
import { Panel, Form, FormGroup, FormControl, Button, Table, Row, Col } from "react-bootstrap";
import NavBar from './NavBar';


class Dashboard extends Component {

  

  constructor(props) {
    super(props);
    this.state = { 
      stock: this.getStockFromUrl(), 
      redirect: true ,
      data: this.getInitialData(),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.renderData();
  }

  getInitialData(){
    return {
      'esg': [],
      'esg_list': [],
    };
  }

  getStockFromUrl(){
    let stock = new URLSearchParams(this.props.location.search).get("stock");
    if ( stock != null ){
      stock = stock.trim();
    }

    if ( stock === null || stock.length === 0 ){
      return "";
    }
    return stock;
  }

  renderData(){
    let stock = this.getStockFromUrl()
    if ( stock === "" )
      return;


    fetch('/get_stocks.php?stock=' + stock)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

          this.setState({ data : responseJson })
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            data: this.getInitialData()
          });
        });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
      });
  }


  render() {
    let esgData = this.state.data.esg;  
    let esgListData = this.state.data.esg_list;

    let Alcoholic_Beverages = "No";
    let Adult_Entertainment = "No";
    let Gambling = "No";
    let Tobacco_Products = "No";
    let Animal_Testing = "No";
    let Fur_and_Specialty_Leather = "No";
    let Controversial_Weapons = "No";
    let Small_Arms = "No";
    let Catholic_Values = "No";
    let GMO = "No";
    let Military_Contracting = "No";
    let Pesticides = "No";
    let Thermal_Coal = "No";
    let Palm_Oil	 = "No";

    if ( esgData.length > 0 ){
      if ( esgData[0].Alcoholic_Beverages === "1" ){
        Alcoholic_Beverages = "Yes";
      }

      if ( esgData[0].Adult_Entertainment === "1" ){
        Adult_Entertainment = "Yes";
      }

      if ( esgData[0].Gambling === "1" ){
        Gambling = "Yes";
      }

      if ( esgData[0].Tobacco_Products === "1" ){
        Tobacco_Products = "Yes";
      }

      if ( esgData[0].Animal_Testing === "1" ){
        Animal_Testing = "Yes";
      }

      if ( esgData[0].Fur_and_Specialty_Leather === "1" ){
        Fur_and_Specialty_Leather = "Yes";
      }

      if ( esgData[0].Controversial_Weapons === "1" ){
        Controversial_Weapons = "Yes";
      }

      if ( esgData[0].Small_Arms === "1" ){
        Small_Arms = "Yes";
      }

      if ( esgData[0].Catholic_Values === "1" ){
        Catholic_Values = "Yes";
      }

      if ( esgData[0].GMO === "1" ){
        GMO = "Yes";
      }

      if ( esgData[0].Military_Contracting === "1" ){
        Military_Contracting = "Yes";
      }

      if ( esgData[0].Pesticides === "1" ){
        Pesticides = "Yes";
      }

      if ( esgData[0].Thermal_Coal === "1" ){
        Thermal_Coal = "Yes";
      }

      if ( esgData[0].Palm_Oil === "1" ){
        Palm_Oil = "Yes";
      }
    }

    if ( esgData == null || esgData.length === 0 ){
      return (
        <div>
          <NavBar />
          <div className="dashboard">
            <div className="container">
              <Panel className="search-panel mt-2">
                <Form horizontal className="form-search">
                  <FormGroup controlId="formEmail">
                    <FormControl
                      type="stock"
                      placeholder="Search Stock name"
                      name="stock"
                      value={this.state.stock}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="formSubmit">
                    <Button bsStyle="primary" type="submit">
                      Search
                    </Button>
                  </FormGroup>
                </Form>
              </Panel>

              <Panel className="dashboard-body">
              </Panel>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavBar />
        <div className="dashboard">
          <div className="container">
            <Panel className="search-panel mt-2">
              <Form horizontal className="form-search">
                <FormGroup controlId="formEmail">
                  <FormControl
                    type="stock"
                    placeholder="Search Stock name"
                    name="stock"
                    value={this.state.stock}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId="formSubmit">
                  <Button bsStyle="primary" type="submit">
                    Search
                  </Button>
                </FormGroup>
              </Form>
            </Panel>

            <Panel className="dashboard-body">
              <Row className="mt-2">
                <Col md={8}>
                  <h4>Environment, Social and Governance (ESG) Risk Ratings</h4>
                  <Table id="esgTable">
                    <thead>
                      <tr>
                        <th>Total ESG Risk score</th>
                        <th>Environment Risk Score</th>
                        <th>Social Risk Score</th>
                        <th>Governance Risk Score</th>
                      </tr>
                    </thead>

                    <tbody>
                      {esgData.map((item, index) => 
                          <tr key={index}>
                          <td className="esg">
                            <div>
                              <span className="big">{item.ESGScores_Total}</span><span className="small">{item.rank}th percentile</span>
                            </div>
                            <div>
                              <span className="bottom">{item.rank_priority}</span>
                            </div>
                          </td>
                          <td className="environment">
                            <span>{item.ESGScores_Environmental}</span>
                          </td>

                          <td className="social">
                            <span>{item.ESGScoresSocial}</span>
                          </td>

                          <td className="governance">
                            <span>{item.ESGScores_Governance}</span>
                          </td>
                        </tr>
                      )}
                      
                    </tbody>
                  </Table>
                  
                  
                  <div className="hidden">
                  <h4 className="mt-5">ESG2</h4>
                  <Table id="esg2Table">
                    <thead>
                      <tr>
                        <th>Total ESG Risk score</th>
                        <th>Environment Risk Score</th>
                        <th>Social Risk Score</th>
                        <th>Governance Risk Score</th>
                      </tr>
                    </thead>

                    <tbody>
                      {esgData.map((item, index) => 
                          <tr key={index}>
                          <td className="esg">
                            <div>
                              <span className="big">{item.esg_total}</span><span className="small">13th percentile</span>
                            </div>
                            <div>
                              <span className="bottom">Low</span>
                            </div>
                          </td>
                          <td className="environment">
                            <span>{item.ESGScores_Environmental}</span>
                          </td>

                          <td className="social">
                            <span>{item.ESGScoresSocial}</span>
                          </td>

                          <td className="governance">
                            <span>{item.ESGScores_Governance}</span>
                          </td>
                        </tr>
                      )}
                      
                    </tbody>
                  </Table>
                  </div>
                </Col>


                <Col md={4}>
                  <h4>ESG Risk Score for Peers</h4>
                  <Table id="peersTable">
                    <thead>
                        <tr>
                          <th>Name</th>
                          <th>Total ESG Risk Score</th>
                          <th>E</th>
                          <th>S</th>
                          <th>G</th>
                        </tr>
                    </thead>
                    <tbody>
                      {esgListData.map((item, index) => 
                        <tr key={index}>
                          <td>{item.Ticker}</td>
                          <td>{item.ESGScores_Total}</td>
                          <td>{item.ESGScores_Environmental}</td>
                          <td>{item.ESGScoresSocial}</td>
                          <td>{item.ESGScores_Governance}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  <h4 className="mt-5">Product Involvement Areas</h4>

                  <Table id="productTable">
                    <thead>
                      <tr>
                        <th>Products and Activities</th>
                        <th>Significant Involvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alcoholic Beverages</td>
                        <td>{Alcoholic_Beverages}</td>
                      </tr>

                      <tr>
                        <td>Adult Entertainment</td>
                        <td>{Adult_Entertainment}</td>
                      </tr>

                      <tr>
                        <td>Gambling</td>
                        <td>{Gambling}</td>
                      </tr>

                      <tr>
                        <td>Tobacco Products</td>
                        <td>{Tobacco_Products}</td>
                      </tr>

                      <tr>
                        <td>Animal Testing</td>
                        <td>{Animal_Testing}</td>
                      </tr>

                      <tr>
                        <td>Fur and Specialty Leather</td>
                        <td>{Fur_and_Specialty_Leather}</td>
                      </tr>

                      <tr>
                        <td>Controversial Weapons</td>
                        <td>{Controversial_Weapons}</td>
                      </tr>

                      <tr>
                        <td>Small Arms</td>
                        <td>{Small_Arms}</td>
                      </tr>

                      <tr>
                        <td>Catholic Values</td>
                        <td>{Catholic_Values}</td>
                      </tr>

                      <tr>
                        <td>GMO</td>
                        <td>{GMO}</td>
                      </tr>

                      <tr>
                        <td>Military Contracting</td>
                        <td>{Military_Contracting}</td>
                      </tr>

                      <tr>
                        <td>Pesticides</td>
                        <td>{Pesticides}</td>
                      </tr>

                      <tr>
                        <td>Thermal Coal</td>
                        <td>{Thermal_Coal}</td>
                      </tr>

                      <tr>
                        <td>Palm Oil</td>
                        <td>{Palm_Oil}</td>
                      </tr>

                    </tbody>
                  </Table>             

                </Col>
              </Row>



            </Panel>
          </div>
      
        </div>
      </div>
    );
  }
}

export default Dashboard;
