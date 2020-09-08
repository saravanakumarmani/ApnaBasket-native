import React, { Component } from "react";
import { BackHandler, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { defineIcon } from '../../assets/images/svg';
import ApnaItemCard from '../../components/atoms/itemCard';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';
import HomeHeader from '../home/header';

export default class ProductsListing extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isCategorySelected: true,
            categoryList: Constants.CATEGORY_LIST,
        };
        this.backIconClicked = this.backIconClicked.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        console.log('go backk');
        this.props.navigation.goBack(null);
        this.props.navigation.navigate('Category');
        return true;
    }

    backIconClicked() {
        this.props.navigation.navigate('Category');
    }
    render() {
        const renderItem = ({ item, index }) => {
            return (
                <ApnaItemCard />
            );
        };
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white', flex: 1 }}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{ backgroundColor: '#FBF7F4', paddingTop: 45, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: '#E5DEDA', zIndex: 100, backgroundColor: 'white' }}>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <HomeHeader
                                backIconClicked={this.backIconClicked.bind(this)}
                                isCategoryHeader={true} />
                        </View>
                    </View>
                    <View style={styles.categoryHeader}>
                        <View>
                            <Text style={{ color: THEME.ACTIVE_TEXT, fontSize: scaleFont(20) }}>dfsfsd</Text>
                            <View style={{ backgroundColor: THEME.ACTIVE_TEXT, width: 25, height: 1.5, marginTop: 7 }}></View>
                        </View>
                        <Text onPress={() => { this.navigateToCategoryList(this.state.categoryList) }} style={{ color: THEME.ACTIVE_TEXT, fontSize: scaleFont(13) }}>
                            View all
                        {defineIcon('arrow-right')}
                        </Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{ zIndex: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 20 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.categoryList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={this.state}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    profilePage: {
        flex: 1,
        backgroundColor: THEME.BLACK,
    },
    header: {
        backgroundColor: 'red',
        paddingLeft: 24,
        paddingRight: 24,
        borderWidth: 0,
        elevation: 0,
    },
    container: {
        flex: 1,
    },
    categoryHeader: {
        marginLeft: 20,
        marginTop: 40,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});