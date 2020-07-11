exports.__esModule = !0, exports.default = {
    getApi: function(e) {
        var a = e.BASEURL;
        return {
            store: {
                getFreight: a + "/unex-basic/postage/queryFullPostage",
                queryStoreList: a + "/casaba-plus/basic/store/query.do"
            },
            member: {
                getToken: a + "/casaba-plus/member/account/third/validate.do",
                create: a + "/casaba-plus/member/account/create.do",
                findAccount: a + "/casaba-plus/member/account/find.do",
                updateAccount: a + "/casaba-plus/member/account/update.do",
                findAccountUnex: a + "/member/mall/account/find",
                updateAccountUnex: a + "/member/mall/account/update",
                findInfo: a + "/casaba-plus/member/account/info/find.do",
                updateInfo: a + "/casaba-plus/member/account/info/update.do",
                findInfoUnex: a + "/member/mall/account/info/find",
                updateInfoUnex: a + "/member/mall/account/info/update"
            },
            cms: {
                cmsUrl: a + "/cms/web/engine/loadViewData",
                cmstree: a + "/cms/web/cms/menu/queryTrees",
                queryDocListByMenu: a + "/casaba-plus/web/menu/queryDocListByMenu.do"
            },
            search: {},
            product: {
                getItemBySpuCode: a + "/pim/solr/item/getItemDetailV1",
                getItemBySkuCode: a + "/pim/solr/item/getItemDetailBySkuV1",
                getItemBySpuList: a + "/casaba-plus/product/get/item/list/by/spucodes.do",
                getItemListbyConditions: a + "/casaba-plus/product/list/searchProductByCondition.do",
                getItemListbyConditionsOld: a + "/casaba-plus/product/get/item/list/by/conditions.do",
                getAttrList: a + "/pim/solr/attribute/getList",
                inventoryBySku: a + "/pim/inventory/query/list/sku-info",
                getConditions: a + "/casaba-plus/product/list/searchFilterByCondition.do",
                getPromotionBySpu: a + "/casaba-plus/promotion/v1/query/activities/by/product.do",
                getCategoryTree: a + "/casaba-plus/product/get/category/tree.do",
                getBrandList: a + "/casaba-plus/product/get/brand/list.do"
            },
            cart: {
                shopCarQuery: a + "/casaba-plus/order/check/promotion",
                shopCartListShare: a + "/casaba-plus/shoppingCart/share/queryShoppingCart",
                shopCartList: a + "/casaba-plus/shoppingCart/queryShoppingCart",
                addGoodsShare: a + "/casaba-plus/shoppingCart/share/addProduct",
                addGoods: a + "/casaba-plus/shoppingCart/addProduct",
                changeAmountShare: a + "/casaba-plus/shoppingCart/share/updateProductCount",
                changeAmount: a + "/casaba-plus/shoppingCart/updateProductCount",
                changeSelect: a + "/casaba-plus/shoppingCart/updateSelect",
                delGoods: a + "/casaba-plus/shoppingCart/deleteProduct",
                delGoodsForStores: a + "/casaba-plus/shoppingCart/deleteProductForStores",
                settle: a + "/casaba-plus/shoppingCart/settle"
            },
            order: {
                orderSettle: a + "/casaba-plus/shoppingCart/orderSettle",
                createOrder: a + "/casaba-plus/trade/createOrder",
                createOrderV2: a + "/casaba-plus/v2/trade/createOrder",
                orderList: a + "/unex-order/orderopen/we-extend/queryOrder",
                orderDetail: a + "/unex-order/orderopen/queryOrderOpenDetail",
                getAutoCancelSet: a + "/unex-order/orderAutoSet/getAutoCancelSet",
                cancelOrder: a + "/casaba-plus/trade/cancelOrder",
                payOrder: a + "/casaba-plus/trade/payOrder"
            },
            coupon: {
                activityDetail: a + "/casaba-plus/coupon/v1/query/coupon/activity/detail.do",
                create: a + "/casaba-plus/coupon/v1/send/coupon/to/user.do",
                query: a + "/casaba-plus/coupon/v1/query/coupons/by/user.do",
                filter: a + "/casaba-plus/coupon/v1/filter/useable/coupons.do"
            },
            invoice: {
                getInvoice: a + "/invoice/url",
                newInvoice: a + "/invoice/reapply"
            },
            gql: {
                server: "" + e.GQLUEL
            }
        };
    }
};