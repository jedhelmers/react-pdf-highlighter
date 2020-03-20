// @flow
import React, { Component } from "react";
import type { T_PDFJS, T_PDFJS_Document } from "../types";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

type Props = {
  url: string,
  beforeLoad: React$Element<*>,
  children: (pdfDocument: T_PDFJS_Document) => React$Element<*>
};

type State = {
  pdfDocument: ?T_PDFJS_Document
};

class PdfLoader extends Component<Props, State> {
  state = {
    pdfDocument: null
  };

  componentDidMount() {
    const { url } = this.props;
    const headers = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': 'secret'
      }
    }
    console.log('url: ', url)

    pdfjs
      .getDocument({ url: url, eventBusDispatchToDOM: true })
      .promise.then(pdfDocument => {
        console.log('pdfDocument', pdfDocument)
        this.setState({
          pdfDocument: pdfDocument
        })
      })
      .catch(console.log)
  }

  render() {
    const { children, beforeLoad } = this.props;
    const { pdfDocument } = this.state;

    if (pdfDocument) {
      return children(pdfDocument);
    }

    return beforeLoad;
  }
}

export default PdfLoader;
