
var React = window.React = require('react');
var ReactDOM = require("react-dom");
var Timer = require("./ui/Timer");
var mountNode = document.getElementById("app");
var AmazonSearch = require('./Amazon').Search;

var ProductList = React.createClass({
    render: function render() {
    var createProduct = function(product) {
    return <div className="product-container" key={product.pid}>
              <div className="product-card">
                <div className="product-contents">
                  <div className="product-action-button">
                    <i className="material-icons">add</i>
                  </div>
                  <div className="products-image">
                    <img src={product.largeImage} />
                  </div>
                  <div className="products-title">{product.name}</div>
                    <div className="products-price">
                      <p>{product.cheapestPrice}</p>
                    </div>
                  </div>
                </div>
              </div>;
    };
    return <div className="product">{this.props.products.map(createProduct)}</div>;
  }
});


var StoreApp = React.createClass({
  getInitialState: function getInitialState() {
    return {
      products: [],
      pageIndex: 0,
      loading: false,
      keyword: 'gundam',
      sidebarActive: false
    };
  },
  onKeywordChange: function onKeywordChange(e) {
    var value = e.target.value;
    if (value) {
      console.log('keyworkd: ', value);
      this.setState({keyword: e.target.value});
    }

  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    //var nextItems = this.state.products.concat([this.state.text]);
    //var nextText = '';
    //this.setState({items: nextItems, text: nextText});
  },
  onToggleSidebar: function onToggleSidebar(e) {
    e.preventDefault();
    this.setState({sidebarActive: !this.state.sidebarActive});
  },
  onProductUpdate: function onProductUpdate(products) {

  },
  onKeywordSearch: function onKeywordSearch(e) {
    var that = this;
    e.preventDefault();
    this.setState({loading: true});
    var amazon = new AmazonSearch;
    amazon.searchByKeyword(this.state.keyword)
      .then(function(res) {
        that.setState({loading: false});
        if (res.data.products) {
          that.setState({products: res.data.products});
          console.log(that.state.products);
        }
      });
  },
  render: function render() {
    return (
      <div>
        <div className="header">
          <div className="header-search-bar-menu-button no-select">
            <i className="material-icons" onClick={this.onToggleSidebar}>menu</i>
          </div>

          <div className="logo">
          </div>

          <form className="header-search-bar" onSubmit={this.onKeywordSearch}>
              <input className="header-search-bar-input" type="text" onChange={this.onKeywordChange} />
              <div value="submit" className="header-search-bar-button no-select" onClick={this.onKeywordSearch}>
                <i className="material-icons">search</i>
              </div>

          </form>

          <div className={this.state.sidebarActive ? 'header-side-bar active' : 'header-side-bar'}></div>
        </div>

        <ProductList products={this.state.products} />
      </div>
    );
  }
});


ReactDOM.render(<StoreApp />, mountNode);

