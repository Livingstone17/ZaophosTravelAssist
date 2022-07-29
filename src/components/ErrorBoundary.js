import React, { Component} from 'react'


class ErrorBoundary extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         hasErrors: false
      }
    }

    static getDerivedStateFromError(error){
        return {
        hasErrors:true
        }
    }

  render() {
    if (this.state.hasErrors) {
        return (
            <h2>Something went wrong</h2>
          )
    }
    return (
        this.props.children
    )
    
  }
}

export default ErrorBoundary