BotBone 帶你進自動化及工業 4.0 的世界，你可以透過它學到

* 實時作業系統 RTOS
* 互動式網頁人機界面 Web-based HMI
* 資料採集與監控系統 SCADA
* 工業以太網 Industry Ethernet
* 工業物聯網 IIot
* 雲端垂直整合

由動程科技 (Mapacode Inc.) 設計，麗臺科技 (Leadtek Research Inc.) 製造行銷，
內建工業控制平台 Botnana OS，並和樹莓派 Model B+ 的腳位相容。
方便學生及工程師整合樹莓派子板，實驗各種工業控制、工業以太網／工業物聯網的構想。

## 步驟一：接上電源

透過板上 3.96 接口連接 5.5V 至 36V 的電源供應器。電源供應器應能提供 1.5 A 以上電流。

註：BotBone 也支援使用大於 1.5A 的 USB 電源供應器供電從 micro USB 接口供電，好處是 USB 電源供應器隨手可得，
但如此作法有以下兩個缺點。

* 如果使用筆電的 USB 埠或 USB Hub 供電，常會因為供電電流不足導至無法開機。
* 佔用 micro USB 接口，導至無法使用 micro USB 連結電腦。

本入門使用 3.96 接口供電。

## 步驟二：連結至電腦

* 使用 UART 連結電腦
* 使用 micro USB 連結電腦

### 使用 UART 連結電腦

當出現 login 提示時，輸入 root。出現 password 提示時，按 enter。

    arm login: root
    Passowrd:

### 使用 micro USB 連結電腦

## 步驟三：安裝驅動程式
## 步驟四：瀏覽 BotBone
## 步驟五：以程式控制 I/O

BotBone 使用一 Forth-like 語言 MSL (Mapacode Scripting Language) 做為它的硬體控制語言以實現設計彈性以及性能。
並作為各種工業用控制語言 (NC, PLC, etc.) 的編譯標的。
此外使用 javascript 語言來整合硬體、網路和雲端。你也可以創造自己的硬體和雲端控制語言。

### 以 MSL 控制 LED

以下為一以 MSL 語言控制 LED 的程式，你可以點擊執行鈕以執行程式，也可以修改後執行。

<form class="pure-form msl">
<button class="pure-button pure-button-primary">執行</button>
<pre class="editor">
#out 0 led pinmode!
#out 1 led pinmode!
#out 2 led pinmode!
#out 3 led pinmode!

0 led pinmode@
1 led pinmode@
2 led pinmode@
3 led pinmode@

1 0 led pin!
1 1 led pin!
1 2 led pin!
1 3 led pin!

0 led pin@
1 led pin@
2 led pin@
3 led pin@</pre>
</form>

### 以 Javascript 控制 LED

以下為以 Javascript 控制 BotBone LED 的範例。此範例透過在 Botbone 上的 nodejs 執行。
Javascript 並不直接控制硬體，而是產生對應的 MSL 程式來控制硬體。此一作法帶來更佳的性能，而且可以和實時系統整合。

以下為一以 Javascript 控制 LED 的程式，你可以點擊執行鈕以執行程式，也可以修改後執行。

<form class="pure-form javascript">
<button class="pure-button pure-button-primary">執行</button>
<pre class="editor">var b = require('botbone-io');
b.pinMode('USR0', b.OUTPUT);
b.pinMode('USR1', b.OUTPUT);
b.pinMode('USR2', b.OUTPUT);
b.pinMode('USR3', b.OUTPUT);
b.digitalWrite('USR0', b.HIGH);
b.digitalWrite('USR1', b.HIGH);
b.digitalWrite('USR2', b.HIGH);
b.digitalWrite('USR3', b.HIGH);
setTimeout(restore, 2000);</pre>
</form>

參考以下文件以瞭解 BotBone 使用的 Botnana 平台的架構以及提供的 MSL 及 Javascript 指令。你也可以設計自己的架構：

* [Botnana HMI 架構](/public/assets/img/botnana-hmi-flux.svg)。
* [BotBone 的硬體控制語言 MSL 及其指令](botbone-io-forth.md)。
* [botbone-io: BotBone 的 Javascript 指令](botbone-io-js.md)。

