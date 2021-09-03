// import React, {Component}  from "react";
// import { Text, View, ScrollView, FlatList } from "react-native";
// import { Card , Icon } from 'react-native-elements';
// import { CAMPSITES } from '../shared/campsites';
// import { COMMENTS } from '../shared/comments';

import { Text, ScrollView , FlatList  } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import React, { Component } from "react";
import { connect } from 'react-redux';
import {baseUrl } from '../shared/baseUrl';
import { comments } from '../redux/comments';

// import { PARTNERS } from '../shared/partners';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments
    };
};


function RenderCampsite(props) {
    const {campsite} = props;
    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={{uri:baseUrl + CampsiteInfo.image}} >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' :'heart-o'}
                    type='font-awesome'
                    color= '#f50'
                    raised
                    reverse
                    onPress={()=> props.favorite ? 
                        console.log('Already set to favorites') : props.markFavorite()}
                />
            </Card>
        );
    }
    return (
    <View />
    );
}

function RenderComment({comments}) {

    const RenderCommentItem = ({item}) => {
        return(
            <View style = {{margin:10}}>
                <Text style={{fontSize:14}} >{item.text} </Text>
                <Text style={{fontSize:12}} >{item.rating} Stars</Text>
                <Text style={{fontSize:12}} >{`--${item.author}, ${item.date}`} </Text>

            </View>
        )
    }
    return (
        <Card title = 'comments'>
            <FlatList
                data ={comments}
                renderItem = {RenderCommentItem}
                keyExtractor = {item => item.id.toString()} />
        </Card>
    )
}

class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
         this.state = {
            
            favorite: false
        };
    }
    markFavorite() {
        this.setState({favorite: true});
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.state.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        // const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
        <ScrollView>
             <RenderCampsite campsite={campsite}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
            <RenderComment comments = {comments} />
        </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(CampsiteInfo);