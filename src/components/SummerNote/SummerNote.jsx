import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale
// Import bootstrap(v3 or v4) dependencies
// import 'bootstrap/js/modal';
// import 'bootstrap/js/dropdown';
// import 'bootstrap/js/tooltip';
// import 'bootstrap/dist/css/bootstrap.css';

export default class SummerNote extends Component {
  onChange(content) {
    console.log('onChange', content);
  }
 
  render() {
    return (
      <ReactSummernote
        value="Default value"
        
        onChange={this.onChange}
      />
    );
  }
}