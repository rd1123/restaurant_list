# restaurant_list
列出餐廳清單的應用程式

## 更新
2020.06.05 新增CRUD功能，並使用MongoDB連接資料庫

## 功能
+ 1.首頁新增Create按鈕，可新增一筆餐廳名單
+ 2.可在首頁、詳細內容頁中點選Edit進行資料修改
+ 3.可在首頁、詳細內容頁中點選Delete進行資料刪除

## 相關安裝
1. 開啟terminal(終端機)，開啟作業目錄下執行：
```
git clone https://github.com/rd1123/restaurant_list.git
```
2. 移動至目錄restaurant_list
```
cd path/restaurant_list
```
3. 使用npm安裝相關套件
```
npm install
```
4. 開啟本地MongoDB資料庫
5. 執行listSeeder.js，匯入餐廳預設資料
```
cd ~/restaurant_list/models/seeds
node restaurantModel.js
```

6. 輸入指令啟動本機伺服器
```
npm run dev
```
出現
```
Server is started on http://localhost:3000
mongodb connect!
```
即成功，並可至http://localhost:3000顯示結果

## 預覽畫面
### 首頁
![index](https://github.com/rd1123/restaurant_list/blob/master/pic/index.jpg)
### 詳細內容頁面
![show](https://github.com/rd1123/restaurant_list/blob/master/pic/show.jpg)
### 編輯頁面
![edit](https://github.com/rd1123/restaurant_list/blob/master/pic/edit.jpg)
### 新增餐廳頁面
![new](https://github.com/rd1123/restaurant_list/blob/master/pic/create.jpg)

# 使用工具
+ [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) -開發code環境
+ [Express](https://www.npmjs.com/package/express) -應用程式架構
+ [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) -使用模板引擎
+ [MongoDB](https://www.mongodb.com/) -資料庫
+ [Mongoose](https://www.npmjs.com/package/mongoose) -MongoDB ODM