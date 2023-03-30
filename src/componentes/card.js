import React from 'react';

class  CardLogin extends React.Component {
    render (){
        return  (
            <div>
                <div className='cardlogin-header'><h1>{this.props.title}</h1></div>
                <div className='cardlogin-body'>
                    {this.props.children}
                </div>  
            </div>
        );
    }
   
}

export default CardLogin;