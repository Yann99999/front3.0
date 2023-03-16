import React from 'react';

class  Card extends React.Component {
    render (){
        return  (
            <div>
                <div className='card-header'><h1>{this.props.title}</h1></div>
                <div className='card-body'>
                    {this.props.children}
                </div>  
            </div>
        );
    }
   
}

export default Card;