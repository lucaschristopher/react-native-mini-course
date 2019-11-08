import React, { Component } from "react";
import api from "../services/api";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default class Main extends Component {
  static navigationOptions = {
    title: "JSHunt"
  };

  state = {
    products: [],
    productInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({
      products: [...this.state.products, ...docs],
      productInfo,
      page
    });
  };

  loadMore = () => {
    const { page, productInfo } = this.state;

    if (page == productInfo.pages) return;

    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>

      <TouchableOpacity 
        style={styles.productButton} 
        onPress={() => {
          this.props.navigation.navigate("Product", { product: item });
        }}
      >
        <Text style={styles.productButtonText}>Access</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list} // Stylize the FlatList content
          data={this.state.products}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          // Triggered when we reached the bottom of the list
          onEndReached={this.loadMore}
          // Defines the percentage of when we want to get to the bottom of the list
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // View
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },

  // FlatList
  list: {
    padding: 20
  },

  // Items
  productContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },

  productTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333"
  },

  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },

  // Button
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#da552f",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },

  productButtonText: {
    fontSize: 16,
    color: "#da552f",
    fontWeight: "bold"
  }
});