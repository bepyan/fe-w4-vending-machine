declare module '@types' {
    interface IProductStock {
        id: number;
        name: string;
        price: number;
        stock: number;
    }

    interface IWalletItem {
        currenyUnit: number;
        cnt: number;
    }
}
