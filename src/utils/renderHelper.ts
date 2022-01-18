export const renderMoney = (money: string | number) => {
    return (money + '').replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
