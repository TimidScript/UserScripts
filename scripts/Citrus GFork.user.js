// ==UserScript==
// @name            [TS] Citrus GFork
// @namespace       TimidScript
// @version         1.1.32
// @description     NOW with version number in Listing!! Advance table view for Greasy Fork. Fixes display bugs. 100 scripts display at a time, favoured user count, remembers last sort order used on Script Listing, "My" Profile Listing, and third Party Listing. Able to distinguish between, Library, Unlisted and Deleted scripts using text icons. Beside FireFox, it now supports Opera and Chrome.
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Read Copyright inside the script
// @include         https://greasyfork.org/*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Citrus_GFork
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_registerMenuCommand
// @icon            data:image/bmp;base64,Qk02JAAAAAAAADYAAAAoAAAAMAAAADAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEBgYMGicnFjFKShs+X18dRWpqHkdubh5Hbm4eR25uHkdubh5Hbm4eR25uHkdubh5Hbm4eR25uHkdubh5Hbm4eR25uHkdubh5Hbm4eR25uHkdubh5Hbm4eR25uHkdubh5Hbm4eR25uHkdubh5Hbm4eR25uHURoaBo7WloULEJCCRIcHAABAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFCQ4OESM1NR9BYWEnVoKCKF2Ojihdjo4oXY6OKF2Ojihdjo4oXY6OKF2Ojihdjo4oXY6OKF2Ojihdjo4oXY6OKF2Ojihdjo4oXY6OKF2Ojihdjo4oXY6OKF2Ojihdjo4oXY6OKF2Ojihdjo4oXY2NJlJ7exs5VVUNGygoAgQHBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg0TExw8WlovaqCgNn/CwjaEzMw1hM3NNITOzjOEzs4zhM7OM4TOzjOEzs4zhM7OM4TOzjOEzs4zhM7OM4TOzjOEzs4zhM7OM4TOzjOEzs4zhM7OM4TOzjOEzs4zhM7OM4TOzjOEzs4zhM7OM4TOzjSEzs40hM7ONYTNzTWDyso1e7y8Kl+PjxUtQ0MCBQgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQERJTc3LmidnTeEzMwzhM/PL4LOzi2Azc0sf83NK3/NzSt/zc0qf83NKn/NzSp/zc0qf83NKn/NzSp/zc0qf83NKn/NzSp/zc0qf83NKn/NzSp/zc0qf83NKn/NzSp/zc0qf83NKn/NzSp/zc0qf83NKn/NzSt/zc0rf83NLIDNzS2Bzc0wgs7ONYXQ0DaBxsYnV4ODChQeHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABARYxSkozebq6NIbR0S6Czs4qf87OKH7OziZ+zs4lfc7OJX3OziV9zs4lfc7OJX3OziV9zs4lfc7OJX3OziV9zs4lfc7OJX3OziV9zs4lfc7OJX3OziV9zs4lfc7OJX3OziV9zs4lfc7OJX3OziV9zs4lfc7OJX3OziV9zs4lfc7OJX7OziZ+zs4pfs7OK4DOzi+Cz881hdDQLmujow0bKSkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFCpAQDR8vr4xhdHRK4HPzyd/z88lfc/PI33PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88ifc/PIn3PzyJ9z88jfc/PJX7PzyiAz88tgc/PNIfS0i5spKQKFR8fAAAAAAAAAAAAAAAAAAAAAAAAAAAKFB4eL3CsrDKG09MrgdHRJn/R0SN+0dEifdHRIX3R0SB90dEgfdHRIH3R0SB90dEgfdHRIH3R0SB90dEgfNDQIHzQ0CB90NAgfdDQIH3Q0CB90NAgfdDQIH3Q0CB90NAgfdDQIH3Q0CB80NAgfNDQIH3R0SB90dEgfdHRIH3R0SB90dEgfdHRIH3R0SB90dEhfdHRIn3R0SR/0dEnf9HRLYPR0TSH09MmV4WFAwUICAAAAAAAAAAAAAAAAAEBAgIhTHR0NIfT0yuC0tIlf9LSIn7S0iB+0tIgftLSIH7S0iB+0tIgftLSIH7S0iB+0tIgftLSH37R0SB/0dEgftHSH3rM1B51xNYdcr/YHHC82RxwvNkccLzZHHC82Rxxvtkdc8HXH3fH1h96zdMgfdHSIH/R0R9+0dEgftLSIH7S0iB+0tIgftLSIH7S0iB+0tIgftLSIH7S0iF+0tIjftLSJ4DS0i6E09M0gsrKFC5FRQAAAAAAAAAAAAAAAAoVICAweLq6LobV1SeB09MiftPTIX3T0yB909MgfdPTIH3T0yB909MgfdPTIH3T0yB+09MgfdLTHnTE2BliqOIWUY7rEkZ98hE+cfYPN2j6DjVk/A41ZPwONWT8DjVk/A43Z/sQOmz4EkB19RNGfvEWUY3sGV6i5BxtudweeczVIH7S0iB+09MgfdPTIH3T0yB909MgfdPTIH3T0yB909MhfdPTI3/T0ymB09Mxh9bWKGCUlAIFCAgAAAAAAAAAABg4VVUzhtPTKoPU1CSA1NQgftTUHn7U1B5+1NQeftTUHn7U1B5+1NQeftTUHn/U1B12x9kWWJrpEj5y9w8yYP4OMF//DzJg/xU7av8eRnT/JE99/yhWg/8qWof/J1SC/yVQf/8fSHb/GD5s/xI1Y/8OMF//DjFf/xA4afsTRn3yGFyh5h11x9keftTUHn7U1B5+1NQeftTUHn7U1B5+1NQfftTUIX/U1CWA1NQthNXVMX7DwwwaKCgAAAAAAAABASJUgoIwidnZJ4LV1SJ/1dUeftXVHn7V1R5+1dUeftXVHn7V1R5+1dUeftXVGmy63hJCefQPMmD/DzFg/xQ5aP8qWIT/R3+n/12cwP9qrMz/cbLS/3S31v92udj/drjX/3S21v9trs//YqLE/1aPs/8+c5z/JlOB/xU7a/8PMV//DjFf/hFAc/YYYKfkHXvR1x5+1dUeftXVHn7V1R5+1dUeftXVH37V1SOA1dUog9XVMYfU1BY0T08AAAAAAgYJCShmnp4th9nZJYLW1iB/1tYefdbWHn3W1h591tYefdbWHn3W1h5+1tYbccLdEkB29w8xXv8RNWb/J1WD/1GMsv9xtNL/fsLf/4PG4v+GyeT/icrl/4jI4v+BwNv/g77a/4W/2f+Dv9r/gMLe/4HE4f9/wt//crXU/1iVu/81Z5P/GD9v/w8xX/8PNGP9FlSU7Bx6z9keftbWHn3W1h591tYefdbWH33W1iGA1tYngtbWMInZ2RxGbGwAAAAAAwkODihtq6ssh9vbJILY2B9/2Ngcf9jYHH/Y2Bx/2Ngcf9jYHH/Y2Bx91dkUUpDuEDJg/xE2aP8xY5D/aKrL/3zB3v+DxeH/h8jj/4nK5f+MzOb/jcvl/4/N5v+PyeL/iMLc/4a91/+Fvdf/hcDb/4bH4/+KyuX/h8jj/4LF4f92utj/VpS6/yhWhP8RNGT/DzNh/hVVlewcfNPZHH/Y2Bx/2Ngcf9jYHX/Y2CCA2Ngmg9jYL4rc3B5Pe3sAAAAAAwkODihtra0rh9zcIoPZ2R1/2dkcftnZHH7Z2Rx+2dkcftnZHH/Z2Rp0yd4RPnL5EDNk/ydVhf9oqsv/fcLe/4PG4f+IyeT/isnj/4nF3v+Gwdr/hL3W/4a91v+Jvtb/i8HY/4vD3P+Ox9//kMrg/5DM5v+OzOb/jczm/4nK5f+Gx+L/fsLe/2ipyv8uXYr/EDNj/w82Zv0YZ7LkHH/Z2Rx+2dkcftnZHH7Z2R+A2dkkg9nZLYnd3R1PfX0AAAAAAwkODidurq4qiN3dIoLa2h2B2tocgNraHIDa2hyA2tocgNraHIHa2hxxvuMROmz9Ezpt/0+JsP97wN3/gsXh/4jI4/96s83/XIWa/0Vdef80R3L/Lz5t/zA9dv8wO4H/NUGK/z1Lk/9EWJb/T26c/2CKrP9xpcH/hL7W/4vJ4v+IyeT/hcfi/37C3/9lpsj/I0+A/xAyYv8TTInyG33V2xyA2tocgNraHIDa2h6B2tojg9raLYre3h1PfX0AAAAAAwkODidur68oh97eIYLb2x1/29saf9vbGn/b2xp/29saf9vbGn/b2yNutugTOGn+Hkp8/2eoyv+Aw9//iMnk/3ChuP8rP0v/JjdG/0FXcP9Rb5X/XoGk/2KCsv9jgrb/Xnqy/1Ruqf9EW5b/NUWD/yYyZv8fLV3/MEdp/1uClv+BudL/icnj/4TG4f97wN3/SoSt/xM5av8RPXP6GHTK4Bp/29saf9vbG3/b2x6A29sjg9vbLInf3x1Qfn4AAAAAAwkODiZvsLApiN/fIIPc3ByB3NwZf9zcGX/c3Bl/3NwZf9zcGYDc3CRvtuoTOGv+K1yL/3K21f+DxuL/hcLc/zxVYP9Pbnz/ir3W/5nR6f+g1+//ptvx/6bb8f+m2/H/ptvx/6Xa7/+i1+z/ndHp/4/A2v9znr3/R2SC/x8vPv84Tlz/fLPK/4jJ5P+Aw+D/ZqbI/yBKe/8QOW79GG/C4xmA3NwZf9zcGn/c3B2B3NwihNzcK4ng4BxPfn4AAAAAAwkODiVusLAnieDgIILd3RuB3d0agN3dGoDd3RqA3d0agN3dGoLd3SR0vOkTO27+Ll+O/3O31v+DxuL/gbzV/1uBkf+QyuP/m9Xu/53V7P+k2O7/ptjv/6bZ8P+u3vT/sOD1/6/g9P+q2/L/ptnw/6fa8f+j2vD/nNXt/3+wyP83S1f/R2Vy/4jH4v+CxeH/brHR/ydYiP8QOW79GG/D5BqB3d0agN3dGoDd3RyB3d0hg93dKorh4RxQf38AAAAAAwgODiVvsbEmiOHhH4Pe3hqA3t4Yf97eGH/e3hh/3t4YgN7eGnjM4hVLgPMPNGT/JVWI/22w0P+ExuL/isrk/4zI4f+X0ev/m9Ps/6HW7v+g1u3/ndPr/6fa8f+04/f/tOP3/7Tj9/+04/f/qtzz/6TY7/+l2O//ntXt/5zW7/+Ctc3/Q1tn/4C71P+Fx+P/b7LS/yhZif8QOnH9FnDF5RiA3t4Yf97eGX/e3huB3t4hhN7eKYri4hxQgIAAAAAAAwkPDyVvs7MmiePjHYTg4BqC4OAXguDgF4Lg4BeC4OAbftXiGEp69RcxT/8eP2b/GUV6/1ybv/+CxeH/jMvm/5PO5/+Z0ev/ndXt/5zR5/9ymKX/WnmC/4azxf+w4fb/tOP3/7Tj9/+w4PX/mMXX/5DB1f+f1Ov/otfu/5rT7P+Vzuj/eKrA/4fF3/+Ex+L/aqzN/yJQgv8QQn36F3jQ4xeC4OAXguDgGILg4BuC4OAfheDgKYvk5BtQgYEAAAAAAwkPDyRwtLQlieTkHYTh4RmB4eEWgOHhFoDh4ReB4eEhaKbvFC9N/zteef8pS23/EDZo/zlwn/96vdr/jMzm/5LP6f+Z0uv/ntbu/22Tnf8WKBv/BhYH/zRHR/+fydr/teX5/7Tk+P+AprP/N0hF/zhMTf97qLn/odfv/5zT7P+V0Or/kc/q/4rL5f+BxOD/WJW7/xdBdv8POGv9E2Ot7BaA4OEWgOHhF4Dh4RqC4eEfheHhKIzl5RtQgYEAAAAAAwkPDyRwtLQkiuXlHITi4hiD4uIXguLiF4Li4h2A2OUeR3H5ID5d/1OAnP8iRWv/DS9d/yNShf9vsNH/jMzm/5LP6v+Z0+z/l8vg/zJTQ/8CHwL/BSAF/w0gEP97n6r/uOj9/5/L2/8tRTz/AxsC/wMYA/86U1L/ms3j/5zU7f+V0Or/j87o/4jJ5P92udf/NGmZ/xU7bv8TMFD/DjVe+xRyyOcXg+LiF4Li4hmD4uIeheLiJ4zm5htRgoIAAAAAAwkPDyNwtbUkiubmG4Xj4xiC4+MVgePjFIHj4yJ3xesXNlv9OF19/1+Oqv8gRG3/DjFh/yVThP9urcv/isrk/5HO5/+a0+7/ib3J/x5FJ/8dQB7/DS4O/wcjCP9wkpT/uej+/3ampv8OMhH/BiYH/wUhBf8aLyL/i7nM/53W7/+V0On/j83n/4LE4P9KhbH/FD50/yFCZ/8xVHP/DylJ/xFWmPEVgePjFoHj4xiD4+MdhePjJozn5xpRgoIAAAAAAwkPDyJwtrYjiufnGoXk5BaD5OQUgeTkFILk5B9vt+4WNFr/SXST/2Satf8iSHH/DzVo/yZWiP9qq8v/hcbi/47N5/+Y0+7/hbrF/y9aOP+CnYT/Jksp/woqC/9yl5z/t+f+/2OUj/8mTSj/P2JB/wgrCf8XMB7/hbTH/5vV7v+Uz+j/jczm/3W31v8mVor/DjBf/yFBZP9OeZn/GTRT/w9Ac/gTfdzmFYLk5BeE5OQchuTkJozo6BpRg4MAAAAAAwkPDyJwt7cii+joGoXl5RaD5eUTguXlE4Tl5Rtpsu8YNlz/VIKf/2ukvv8nTnn/EDdu/ydYjP9rrM3/hcfi/43M5/+U0ev/jMTX/0V0WP+Dm4L/IkUh/xpAIv+JucX/seP6/2ial/9YfGH/ip6M/w01Dv8lSTL/kcPX/5jR6/+Rzeb/hsfh/2ilw/8eSnz/DjBf/yVJb/9ej6r/KEdl/w01YvwTdtHpFIPl5ReE5eUbhuXlJYzp6RlRhIQAAAAAAwkPDyFxuLghi+rqGYbn5xSE5+cTg+fnE4Xn5xlqs/AXNl3/VIGd/3aux/8yXoj/EDdw/yRViv9oqsv/g8bh/4vL5f+Qzuj/ltHq/2ablv8tVjL/FkAa/1uIfv+i1ev/qNvz/4S4wf9PeVr/S2xP/wsyDP9Qf3f/mNLs/5PP6f+MyuT/gsPe/16au/8bRXr/DjJi/zBYff9mmbT/LlFz/wwwXf4ScMjtE4Xn5xWF5+cbhufnJI3r6xlShYUAAAAAAwkPDyFxubkhjOvrGIbo6BSD6OgSg+joEoPo6BpvvvASNmP/OmWL/3CnwP8/b5f/FTx0/yRSi/9mo8b/jMrj/5XP5/+b0un/otbr/6LS5f+Hs7T/iLO1/6vX6f+03/L/tN/y/67a7P97pp7/THJY/16Hef+YyNj/odbt/5jR6f+Rzeb/hcTf/1OOtv8XQXn/DzVn/0Fvk/9spb//LlR5/wwuW/4RbsXuE4To6BSE6Ogah+joJI3s7BhRhYUAAAAAAwkPDyBxurogi+zsF4fp6ROD6ekQgunpEYPp6R580e4hSHf9K054/1N4mv9Qc5b/QWKO/0ltnv91pMb/nM/k/6XV6f+n1+v/qtns/63b7v+y3vP/tN/z/7Te8f+t2Oz/rNjr/7Te8f+03vD/rdfl/7Db7P+w3O//rNns/6jY7P+k1er/lsrh/2OOs/87Xo3/NliD/2uatf94rcT/LlF0/w0vXv4QbsfvEYTp6RSE6ekZh+npI43t7RhShoYAAAAAAwkPDyByu7sejO3tFobq6hmI6+sjjezsMZTt7UKb6e9UgK77TWeK/0xmiv9OaY//Tm+Z/k9wn/9ljrf/lMfe/6HT6P+l1ur/p9fr/6nZ7P+s2u3/rdvu/6fW6v9/rMz/gK3N/6nY6/+w3O//sNzw/67a7f+r2ez/qNjs/6bX6/+i1Oj/jsDZ/1yAqv9NbZf/YoGi/5fB1P+HrsT/SGSF/zJWgf4lgNXwGInr6xWF6uoXh+rqIo7u7hhShoYAAAAAAgkPDyJzvLwulPDwOJju7kOe8PBJoPDwTKHw8Eyh8PBSnuPzUInA+EyAtvlMisj2UYzH91Fzn/9Sd6f/eafI/5nM4v+g0+j/pdXq/6bW6v+m1ur/otTp/4Ky0f9Xf7D/XYa0/5LD3P+n1+v/qtnt/6nZ7P+n1+v/ptbq/6PU6f+bzuT/daHE/1Byof9Na5X/ZIOj/3+iuf9igaD/TGWH/0t4p/tKnevxQ57w8DiY7u4pkO3tJZDw8BdSh4cAAAAABQoQEECDwMBUqPT0UKby8kyk8vJKo/LySqLy8kqi8vJJovHxSaLx8Umh8fFJovHxT6Lq81iGtPxPcaD/V36s/32sy/+XyeD/nM/l/53R5v+YyuH/fKvM/1iAsf9Rd6v/Unis/22Zv/+YyuH/otTp/6TV6v+k1er/odLn/5vP5P+Bsc//Vnyr/05vnf9Oa5P/T2mN/1Brjv9NZ4r/TGuS/kuP0fZKo/LySqPy8k2l8vJPpfHxTKX19SdaiYkAAAAABgsQEEqIwcFWqvX1TaXy8kqj8vJKo/LySqPy8kqj8vJKo/LySqPy8kqj8vJKo/LySqPy8laf3/ZWfar+T3Kj/1Z9rf9tmb//e6rL/3inyf9mkbv/VHut/1J3rP9SeKz/Unis/1R7rf9yn8P/kcPb/5rN4/+azeP/lcfe/32tzP9ZgK7/T3Gh/1N4pP5RicH5Tnak/E1rkv5Ncpz9TY7K90qi8PJKo/LySqPy8kuk8vJPpvLyWav29jVii4sAAAAABgsQEEiIwsJUqfb2T6Tz80ui8/NJovPzSaLz80mi8/NJovPzSaLz80mi8/NJovPzSaLz80uj8vNUl9X4UXen/lByo/9Rdqr/U3mt/1J4rP9Rd6v/Uneq/1J3q/9SeKz/Unit/1J4rP9Tea3/Yoy3/3Kfw/9zocX/Z5K6/1V8rv9Qc6X/UHqr/VGV0/dKovLzSp3o9EuW2/ZKm+T1SaLy80mi8/NJovPzSqLz80yj8/NQpfPzWKv39zVjjIwAAAAABgsQEEiJw8NUq/f3TaX09Emj9PRHovT0R6L09Eei9PRHovT0R6L09Eei9PRHovT0R6L09Eei9PRJo/P0T5PU+E94qv5Qc6T/Uneq/1J4rP9SeKv/UHSl/05vmv9Pbpn/UHGe/1B0pP9Rd6n/UXer/1F4rP9Seaz/UXer/1B0pf9Qc6D/T5HP+Uij9PRHovT0R6P09Eej9PRHo/T0R6L09Eei9PRHovT0SKL09Eqj9PRPpvT0V634+DRjjIwAAAAABgsQEEmJxMRTq/j4TKb19Umk9fVIpPX1SKT19Uik9fVIpPX1SKT19Uik9fVIpPX1SKT19Uik9fVIpPX1SaT09UuY3fdPfrT9UHSk/1F2qP9SeKz/Unis/1F1pf9ObZX/TWqP/01skv9ObZf/T3Gf/1F1p/9SeKv/UXao/09xoP9ObZj/TXqq/Eme6vZIpPX1SKT19Uik9fVIpPX1SKT19Uik9fVIpPX1SaT19Uml9fVNp/X1Vqz5+TVijY0AAAAABgsQEEiJxMRTq/j4S6b19Umk9fVHpPX1R6T19Uek9fVHpPX1R6T19Uek9fVHpPX1R6T19Uek9fVHpPX1R6T19Uek9fVJn+z3TYrH+093qv5RdKX/UXap/1J4rP9Rdab/Tm2V/01rkv9NbJP/TWyT/05tmP9OdKT+ToO+/E99sf1Pc6L/Tm2W/0yGv/tIo/L1R6T19Uek9fVHpPX1R6T19Uek9fVHpPX1SKT19Umk9fVNpvX1Vq36+jRijY0AAAAABQkNDUaFvb1UrPr6Tab390ik9/dGo/f3RqP390aj9/dGo/f3RqP390aj9/dGo/f3RqP390aj9/dGo/f3RqP390aj9/dGpPf3RqP190mY4flNgr38UHao/1B0pP9Rdqj/UHSk/05tlv9NbJP/TWyT/05rlv9ObZf/TYK5/Eid6fhJl975S4XB+057rf1Oltb5RqP390aj9/dGo/f3RqP390aj9/dGo/f3R6P390mk9/dOp/f3V677+zJdhYUAAAAAAgMFBT1zpKRUrfz8TKj4+Eem+PhGpPj4RqT4+Eak+PhGpPj4RqT4+Eak+PhGpPj4RqT4+Eak+PhGpPj4RqT4+Eak+PhGpPj4RqT4+Eal+PhGovP4SZXd+k6Evv1Qd6n/UXSk/1Byof9Obpj/TWyT/01slf9Oa5X/Tm6X/0mPz/pGpfj4RqT3+Eed6/hLm+L5RqT3+Eak+PhGpPj4RqT4+Eak+PhGpPj4RqT4+Eim+PhOqfj4Vqz5+ShKaWkAAAAAAAAAACxTdnZVrfr6Taj4+Eem+PhGpPj4RaT4+EWk+PhFpPj4RaT4+EWk+PhFpPj4RaT4+EWk+PhFpPj4RaT4+EWk+PhFpPj4RaT4+EWk+PhFpPj4RaX4+Eai9PhJmOH6T4rE/FB6rf5QcqH/Tm2Y/01rlP9Oa5X/TmuU/0x4p/1Gn+z5RaT4+EWk+PhFpPj4RaT4+EWk+PhFpPj4RaT4+EWk+PhFpPj4RqT4+Eim+PhPqfn5U6Xt7RgsPj4AAAAAAAAAABUnODhSoenpUKn6+kum+flGpfn5RaX5+USl+flEpfn5RKX5+USl+flEpfn5RKX5+USl+flEpfn5RKX5+USl+flEpfn5RKX5+USl+flEpfn5RKX5+USl+flEpfn5RaT3+Ume6vpOktL8UoK2/lJ0of9PbZb/TmqU/05sl/9Jj9D7RKb5+USl+flEpfn5RKX5+USl+flEpfn5RKX5+USl+flFpfn5R6b5+Uym+flTq/z8R4nFxQcNExMAAAAAAAAAAAMFCAg9dqmpVK7+/kyo+vpHpvr6RKT6+kOk+vpCpPr6QqT6+kKk+vpCpPr6QqT6+kKk+vpCpPr6QqT6+kKk+vpCpPr6QqT6+kKk+vpCpPr6QqT6+kKk+vpCpPr6QqT6+kKk+vpDpfr6RaP0+0uc5PxQjsv9UH6x/lBzoP9OgLP9RKL1+kKk+vpCpPr6QqT6+kKk+vpCpPr6QqT6+kOk+vpFpPr6SKb6+k6p+vpWrPr6KU9wcAAAAAAAAAAAAAAAAAAAAAAYLD8/UKDn51Gs/f1Kqfv7Rqf7+0Om+/tCpfv7QqX7+0Kl+/tCpfv7QqX7+0Kl+/tCpfv7QqX7+0Kl+/tCpfv7QqX7+0Kl+/tCpfv7QqX7+0Kl+/tCpfv7QqX7+0Kl+/tCpfv7QqX7+0Km+/tDpvv7RKL1+0ic5vxJlNj8RKLz+0Kl+/tCpfv7QqX7+0Kl+/tCpfv7QqX7+0Sm+/tHp/v7S6n7+1Ou/v5FiMPDChEZGQAAAAAAAAAAAAAAAAAAAAABAQICK1R3d1Oq9/dPqvz8Saj7+0Wn+/tDpvv7QqX7+0Kl+/tBpfv7QaX7+0Gl+/tBpfv7QaX7+0Gl+/tBpfv7QaX7+0Gl+/tBpfv7QaX7+0Gl+/tBpfv7QaX7+0Gl+/tBpfv7QaX7+0Gl+/tBpfv7QaX7+0Gl+/tBpfv7QaX7+0Gl+/tBpfv7QqX7+0Kl+/tCpfv7RKb7+0an+/tKqPv7Ua3+/k+e5eUaMEVFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAcLCzJhjIxTqvj4T6v+/kuo/f1Hp/39Rab9/USl/f1Dpf39Q6X9/UOl/f1Dpf39Q6X9/UOl/f1Dpf39Q6X9/UOl/f1Dpf39Q6X9/UOl/f1Dpf39Q6X9/UOl/f1Dpf39Q6X9/UOl/f1Dpf39Q6X9/UOl/f1Dpf39Q6X9/UOl/f1Dpf39RKX9/USl/f1Gpv39SKf9/Uyp/f1Srf//T6Dp6SJBXV0AAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIDAwrVHh4TqDp6VGu//9Mq/7+Sar+/kip/v5HqP7+Rqj+/kao/v5FqP7+Raj+/kWo/v5FqP7+Raj+/kWo/v5FqP7+Raj+/kWo/v5FqP7+Raj+/kWo/v5FqP7+Raj+/kWo/v5FqP7+Raj+/kWo/v5FqP7+Raj+/kao/v5GqP7+R6j+/kip/v5Kqv7+Tq3//1Ou//9IktPTHThQUAEBAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgMDFyw/Pzt3rKxOpO7uUa7//0+t//9NrP//Taz//0ys//9MrP//TKz//0ys//9MrP//TKz//0ys//9MrP//TKz//0ys//9MrP//TKz//0ys//9MrP//TKz//0ys//9MrP//TKz//0ys//9MrP//TKz//02s//9NrP//Tq3//1Ct//9Rrf39S5vi4jJjj48OGiUlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGCQkUKDk5KlN5eTp1qalBhsPDQovLy0KLy8tCi8vLQovLy0KLy8tCi8vLQovLy0KLy8tCi8vLQovLy0KLy8tCi8vLQovLy0KLy8tCi8vLQovLy0KLy8tCi8vLQovLy0KLy8tCi8vLQovLy0KLy8tCi8rKQIO+vjZsnZ0kSGhoDhwoKAECAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEBgYFCQ4OBQsREQULEREFCxERBQsREQULEREFCxERBQsREQULEREFCxERBQsREQULEREFCxERBQsREQULEREFCxERBQsREQULEREFCxERBQsREQULEREFCxERBQsREQULEREFCxERBAgMDAECAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// ==/UserScript==


/* License + Copyright Notice
********************************************************************************************
Copyright © TimidScript, All Rights Reserved.
[Creative Commons BY-NC-SA](http://en.wikipedia.org/wiki/Creative_Commons_license)

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) This copyright must be included
2) Due credits and link to original author's homepage (included in copyright).
3) Notify the original author of redistribution

TimidScript's Homepages:  [GitHub](https://github.com/TimidScript)
                          [OpenUserJS](https://openuserjs.org/users/TimidScript)
                          [GreasyFork](https://greasyfork.org/users/1455-timidscript)
*/
/* Information
********************************************************************************************
    Version History
----------------------------------------------
1.1.32 (2015-07-04)
 - Added overflow style to code tag
1.1.31 (2015-06-27)
 - Using URI (base64) for script icon
1.1.30 (2015-06-08)
 - Bug Fix: "Report Bug" and "Review" review button always visible even when there is no need.
1.1.29 (2015-06-08)
 - Using json to populate the table. This allows the extraction of version number.
 - Changed the feedback system rating interface. Review by default is hidden.
 - Supporting of versions "Obselete", "Depreciated", and "Defunct" similar to the script "OUJS-1"
1.0.28b (2015-04-04)
 - Bug fix to handle site searches
1.0.27 (2014-12-28)
 - Bug fix to changes made in 1.0.25
 - Changed the sets into a menu. CSS provided by decembre.
1.0.26 (2014-12-27)
 - pre tag bug fix
1.0.25 (2014-12-27)
 - decembre's request to show favourite sets to script listing
script-list-set
 - Bug Fix to support URL local syntax
1.0.24 (2014-12-06)
 - Bug Fix in script paging
 - Bug Fix due to changes in url flags. Change sort flag from "fans" to "ratings"
 - Add total rating and provided total score also
 - Added counter to the number of users that favoured the script, in feedback tab
1.0.23 (2014-11-29)
 - Add styling for forum blockquote tag
 - Changes to deal with new GF layout
1.0.22 (2014-11-07)
 - Fix to handle changes in forum URL (localization added)
 - Add more fonts colours to the forum to distinguish between different types of usernames/links.
1.0.21 (2014-10-31)
 - Support for Opera now added. Dozen of browsers open causes confusion.
1.0.20 (2014-10-31)
 - Change table header "Fans" to "Score"
 - Slight changes to forum CSS
 - Support for Opera and Chrome added.
1.0.19 (2014-10-23)
 - Removed sign-out button as it has been added with today's site update
1.0.18 (2014-10-23)
 - Bug fix to accommodate new site changes to the URL syntax (localization added)
1.0.17 (2014-10-18)
 - Changed the framing of images to suite smaller images better
 - Credit link now points to my GF profile rather than OUJS
 - Added sign-out near the name
 - Bug fix: add script table only when need
1.0.16 (2014-09-29)
 - Got rid of the flashing timer
1.0.15 (2014-09-29)
 - Fixed the issue that 1.0.14 supposedly had fixed
 - Appreciation notice added
1.0.14 (2014-09-22)
 - Re-fixed profile table sort :?
1.0.13 (2014-09-19)
 - Fix in profile table sort
1.0.12 (2014-09-19)
 - Bug fix in sorting of lists with search. Not using global flag when matching regex
1.0.11 (2014-09-16)
 - Bug fix in search listing introduced in version 1.0.10
1.0.10 (2014-09-16)
 - Bug Fix: Daily installs sort order
 - Click on separator to toggle deleted script display
1.0.9 (2014-09-07)
 - Added new CSS  for <code> and <pre> elements
1.0.8 (2014-08-03)
 - Author name next to title
1.0.7 (2014-08-29)
 - Added GM_update
 - Added script numbers to table
1.0.6 (2014-08-21)
 - Bug Fix for sorting
1.0.5 (2014-08-21)
 - Small CSS fix provided by decembre (https://greasyfork.org/forum/discussion/comment/4182)
1.0.4 (2014-08-20)
 - Bug Fix: Author not being displayed
 - Bug Fix: Handle missing elements in user profile
1.0.3 (2014-08-20)
 - Link to my homepage
 - By default deleted scripts are hidden now
 - Stole some CSS from OUJS ^_^
 - Added a frame around images and max-width
 - Few small bug fixes
1.0.2 (2014-08-19)
 - Changes to CSS, including smaller font
 - Changed the interface
 - Added filter on user profile
 - Changed the behaviour of column click. If clicked it goes to first page as oppose to remaining on the same page
 - Increased number of scripts returned to 100
 - Citrified, orangified and crucified the forum. （￣﻿ _ゝ￣）
 - Small bug fixes
1.0.1 (2014-08-18)
 - Initial release. Released as good enough. May contain bugs but good for general usage.

**********************************************************************************************/

(function ()
{
    var scripts = new Array(),
        pathname = decodeURIComponent(document.location.pathname);

    TSL.addStyle("OverFlowCode", ".Comment .Message p {overflow-x:auto;}");

    OrangifyPage();
    if (pathname.match(/(\w|-)+\/forum\/(post|discussion)\//) && document.getElementById("Form_Rating"))
    {
        TSL.addStyle("", ".choiceButtons {text-align:center; width: 80px;}");

        var po = document.querySelector(".PostOptions, .CommentOptions"),
            lbl = po.querySelector("label"),
            options = po.querySelectorAll(".RadioLabel"),
            hld = document.createElement("div"),
            btn1 = document.createElement("input"),
            btn2 = document.createElement("input");

        btn1.className = btn2.className = "choiceButtons  Button";
        btn1.value = "Report bug"; btn1.style.marginRight = "4px";
        btn2.value = "Review";

        btn1.onclick = function ()
        {
            btn1.style.color = "#2DCD05";
            btn2.style.color = "";

            options[0].setAttribute("style", "margin-top: 5px !important;");
            options[4].removeAttribute("style");

            options[1].setAttribute("style", "display: none !important;"); //options[1].style.display = "none !important";
            options[2].setAttribute("style", "display: none !important;");
            options[3].setAttribute("style", "display: none !important;");
            lbl.setAttribute("style", "display: none !important;");

            options[0].click();
        }

        btn2.onclick = function ()
        {
            btn1.style.color = "";
            btn2.style.color = "#2DCD05";

            options[0].setAttribute("style", "display: none !important;");
            options[4].setAttribute("style", "display: none !important;");

            options[1].removeAttribute("style");
            options[2].removeAttribute("style");
            options[3].removeAttribute("style");
            lbl.removeAttribute("style");

            options[3].click();
        }

        hld.appendChild(btn1);
        hld.appendChild(btn2);
        po.insertBefore(hld, po.firstElementChild);
        btn1.click();
    }
    else if (pathname.match(/\/[\w-]+\/scripts\/\d+/)) //Script Page
    {
        TSL.addStyle("", "#script-content {background-color: #F9ECDB; margin: 0; padding-bottom: 5px;} #script-links > li:hover { background-color: yellow; } .current {background-color: #F9ECDB !important;}");
        TSL.addStyle("", ".install-link {background-color: #F7A207;} .install-help-link {background-color: #F9C565 !important;}");
        TSL.addStyle("", "#additional-info {border-radius: 5px; background-color: #F9DACD;} #additional-info > div {background-color: white;}");
        TSL.addStyle("", "header:first-child {background-color:white; padding: 5px 10px;}");

        var notice = document.createElement("div");
        notice.textContent = "Show your appreciation to the author by favouring the script and giving positive feedback";
        notice.setAttribute("style", "padding: 3px 10px; border-radius: 4px; background-color: yellow; text-align: center;");

        if (pathname.match(/\/scripts\/[^\/]+\/feedback/i))
        {
            el = document.querySelector("#script-content");
            if (el) el.insertBefore(notice, el.firstElementChild);

            el = document.querySelector(".inline-list");

            var count = el.querySelectorAll("li").length;

            el = document.getElementById("feedback-favoriters");
            el.innerHTML += " (<span style='color: #F00;'>" + count + "</span>)";
        }
        else
        {
            var el = document.querySelector("#install-area");
            if (el) el.appendChild(notice);
        }
    }
    else if (pathname.match(/\/[\w-]+\/scripts/)) //Script Listing
    {
        document.body.setAttribute("PageType", "ListingPage");
        getScripts();

        if (scripts.length > 0)
        {
            createScriptTable();
            populateScriptTable();


            if (document.getElementById("script-table"))
            {
                document.body.insertBefore(document.getElementById("script-table"), document.getElementById("main-header").nextElementSibling);

                //document.querySelector("#script-table tr td:nth-child(2)").appendChild(document.getElementById("UserSets"));

                TSL.addStyle("TheBlackLagoon", "#UserSets {position: fixed !important;display: inline-table !important;float: none !important;left: 30px !important;top: 68px!important;padding: 2px 5px;background-color: yellow;border-radius: 5px;z-index: 200!important;visibility: hidden!important;opacity: 1!important;}"
                           + "#UserSets:hover {visibility: visible!important;opacity: 1!important;}"
                           + '#UserSets:before {content: "Sets ▼ " !important;position: fixed !important;display: inline-block !important;left: 40px !important;top: 62px!important;margin: 2px 10px;padding: 1px 10px!important;background-color: yellow;border-radius: 5px;z-index: 200!important;visibility:visible!important;opacity: 1!important;}'
                           + "#UserSets li {position: relative !important;display: inline !important;float: left!important;clear: both!important;min-width: 200px!important;margin-bottom: 2px!important;padding: 2px 8px;background-color: white;border-radius: 2px; text-align:left;}"
                           );
            }

            selectSortOrder("ListingPage");

            TSL.removeNode("browse-script-list");
        }
    }
    else if (document.URL.match(/\/users\/(\w|-)+/)) //Authors Profile Page
    {
        var pageType = (document.getElementById("control-panel")) ? "PersonalProfile" : "UserProfile";
        document.body.setAttribute("PageType", pageType);

        getScripts();
        OrangifyUserPage();

        if (scripts.length > 0)
        {
            createScriptTable();
            populateScriptTable();

            selectSortOrder(pageType);
        }
    }

    /* Base CSS styling
    ---------------------------------------------------------------------------*/
    function OrangifyPage()
    {
        //#region Adding CSS Styles E3E2E2
        TSL.addStyle("CitrusGF_Main", "body {font-size: 14px;}"
                      + "#main-header, #Head {background-color: orange !important;} #Head a, #site-nav a {color: yellow !important;}"
                      + "#site-name {text-decoration: underline; color: white;}"
                      + "#title-image {height: 50px; border-radius: 20px; margin-left: 5px;}"
                      + "#title-text {font-size: 40px; color:black; font-family:'Open Sans',sans-serif; font-weight: 400; margin: 0 10px; line-height: 48px;}"
                      + "#title-subtext {color: yellow !important; font-size: 10px; text-decoration: none; position: absolute; left: 210px; top: 43px; font-weight: 400 !important;}"
                      + "#nav-user-info {top: 3px;}"
                      + "pre {background-color: #FFFF99; padding: 5px; margin-left: 30px; padding: 5px 10px;}"
                      + "code {padding: 2px 4px; font-size: 90%; color: #C7254E; background-color: #F9F2F4; white-space: nowrap; border-radius: 4px; font-family: Menlo,Monaco,Consolas,'Courier New',monospace;}"
                      + "pre > code {white-space: pre; background-color: transparent;}"
                      );

        TSL.addStyle("CitrusGF_ScriptPage", "#additional-info img {max-width: 98%; border: 1px solid orange; box-shadow: 5px 5px 2px #888888; margin: 5px 0; padding: 2px; color: yellow; }");

        if (document.location.pathname.match(/[\w-]+\/forum\//i))
        {
            TSL.addStyle("CitrusGF_Forum", "body:not(.Settings) a:not(.Button) { color: #F19E06; }"
                + "body a.Username { color: #E17205 !important; }"
                + ".QuoteAuthor a[href*='forum/profile/'] { color: #FB4507 !important;}"
                + "a[href*='forum/profile/'] { color: #25C614 !important; font-weight: 600;}"
                + "code {padding: 1px 3px; border-radius: 3px; border: 1px solid; background-color: #F9EBD2; color: #EB5100; margin: 0;}"
                + "#title-subtext {top: 45px;}"
                + "blockquote {background-color: #FFFFA4; margin: 5px 0px 5px 30px; padding: 5px;}"
                );
        }
        //#endregion

        var sname = document.getElementById("site-name");
        sname.innerHTML = "";

        var link = document.createElement("a");
        link.href = "/";
        link.innerHTML = '<img id="title-image" src="https://i.imgur.com/RqikjW1.jpg" />'
                        + '<span id="title-text">Greasy Fork&nbsp;</span>'
                        + '<a id="title-subtext" href="/users/1455-timidscript">100% Citrusy Goodness by <b>TimidScript</b></span>';
        sname.appendChild(link);


        if (pathname.match(/\/[\w-]+\/scripts/) && document.querySelector("#script-list-set ul")) //Script Listing
        {
            TSL.addStyle("TheBlackLagoon", "#UserSets {display: block; background-color: yellow; margin: 2px 10px; border-radius: 5px; padding: 2px 10px;}"
                + "#UserSets li {display: inline-block; padding: 2px 8px; background-color: white; border-radius: 2px;}"
                + "#UserSets li + li {margin-left: 1px}"
                );

            var sets = document.querySelector("#script-list-set ul");
            var mh = document.getElementById("main-header");
            sets.id = "UserSets";
            document.body.insertBefore(sets, document.getElementById("main-header").nextElementSibling);
        }

        TSL.removeNode("script-list-option-groups");
    }

    function disco(i)
    {
        notice.style.backgroundColor = (i % 2) ? "transparent" : "yellow";
        if (i < 18) setTimeout(disco, 500, ++i);
    }

    /* Styling for user page
    ---------------------------------------------------------------------------*/
    function OrangifyUserPage()
    {
        TSL.addStyle("CitrusGF_Shared", ".white-panel, #control-panel, #user-profile, #user-discussions-on-scripts-written {margin: 5px; border-radius: 8px; padding: 10px; }");
        TSL.addStyle("CitrusGF_Profile", ".white-panel, #user-discussions-on-scripts-written, #control-panel, #user-profile {background-color: white; }");
        TSL.addStyle("", "#user-control-panel, #control-panel h3 {margin: 0; padding: 0;}  #user-control-panel > li { display: inline-block; margin: 0 5px; padding: 2px 5px; border-radius: 5px; background-color: #F5F2F2; border: 1px solid #404040; box-shadow: 3px 3px 2px #888888;} #user-control-panel a {text-decoration: none;} #user-control-panel li:hover {background-color: #FBEACA;}");
        TSL.addStyle("", ".white-panel *, #user-discussions-on-scripts-written * {margin: 0;}");
        TSL.addStyle("CitrusGF_OUJS", 'code {padding: 2px 4px;font-size: 90%;color: #C7254E;background-color: #F9F2F4;white-space: nowrap;border-radius: 4px;font-family: Menlo,Monaco,Consolas,"Courier New",monospace; }');


        var author = document.createElement("h1");
        var name = document.getElementsByTagName("h2")[0];

        var up = document.getElementById("user-profile");
        if (!up)
        {
            up = document.createElement("section");
            up.id = "user-profile";
            up.textContent = "...";
            name.parentElement.insertBefore(up, name);
        }

        up.innerHTML = "<h1 style='margin: 0 0 5px 0; color: orange;'>" + name.textContent + "'s Profile</h1>" + up.innerHTML;
        TSL.removeNode(name);

        var el = document.getElementById("user-script-sets");
        if (el) el.parentElement.className = "white-panel";

        el = document.getElementById("user-script-list");
        if (el) TSL.removeNode(el.parentElement);

        el = document.getElementById("user-deleted-script-list");
        if (el) TSL.removeNode(el.parentElement);
    }


    /* Gets the scripts from document
    ---------------------------------------------------------------------------*/
    function getScripts(doc)
    {
        if (!doc) doc = document;
        var ids = ["user-script-list", "user-deleted-script-list", "browse-script-list"];
        scripts = new Array();

        for (var i = 0; i < ids.length; i++)
        {
            var el = doc.getElementById(ids[i]);
            if (!el) continue;

            var deleted = ids[i].indexOf("deleted") > 0;
            var list = el.children;
            for (var j = 0; j < list.length; j++)
            {
                var li = list[j];
                var script = new Object();
                script.name = li.getAttribute("data-script-name");
                script.id = li.getAttribute("data-script-id");
                script.author = li.getAttribute("data-script-author-name");
                script.authorID = li.getAttribute("data-script-author-id");
                script.description = li.getElementsByClassName("description")[0].textContent.trim();
                script.rating = li.getAttribute("data-script-rating-score");
                script.ratings = li.querySelector("dd.script-list-ratings").innerHTML;
                script.installsDaily = li.getAttribute("data-script-daily-installs");
                script.installsTotal = li.getAttribute("data-script-total-installs");
                script.dateCreated = li.getAttribute("data-script-created-date");
                script.dateUpdated = li.getAttribute("data-script-updated-date");
                script.type = li.getAttribute("data-script-type");
                script.deleted = deleted;
                scripts.push(script);
            }
        }
    }


    /* Creates scripts table
    ---------------------------------------------------------------------------*/
    function createScriptTable()
    {
        var scriptTable = document.createElement("table");
        scriptTable.id = "script-table";
        var thead = scriptTable.createTHead();
        var row = thead.insertRow(-1);

        var headers = ["Name", "Ratings", "Daily", "Total", "Created", "Updated"];
        var tags = ["name", "ratings", "", "total_installs", "created", "updated"];

        cell = row.insertCell(-1);
        cell.textContent = "#";

        var cell;
        for (var i = 0; i < headers.length; i++)
        {
            cell = row.insertCell(-1);
            cell.innerHTML = headers[i];
            cell.onclick = onTableHeaderClick;
            cell.setAttribute("tag", tags[i]);
        }

        cell = row.cells[1];
        switch (document.body.getAttribute("PageType"))
        {
            case "PersonalProfile":
                cell.innerHTML += '<span class="filterL" style="margin-left: 10px;" title="Library Filter">L</span>'
                                + '<span class="filterU" title="Unlisted Filter">U</span>'
                                + '<span class="filterD" title="Deleted Filter">D</span>';
                break;
            case "UserProfile":
                cell.innerHTML += '<span class="filterL" style="margin-left: 10px;">L</span>';
                break;
            default:
                break;
        }

        var btns = cell.getElementsByTagName("span");
        for (var i = 0; i < btns.length; i++) btns[i].onclick = onFilterClick;

        //scriptTable.createTBody();
        scriptTable.appendChild(document.createElement("tbody"));
        document.body.appendChild(scriptTable);

        TSL.addStyle("CitrusGS_Table", "#script-table {display: block; margin: 0 5px 5px 5px;} body {background-color: #EFEFB1; margin: 0;}"
            + "#script-table thead td {background-color: orange; border-radius: 0 0 5px 5px; box-shadow: 3px 3px 2px #888888;}"
            + "#script-table thead td:hover {cursor:pointer; background-color: yellow;}"
            + "#script-table thead td:first-child:hover {cursor:default; background-color: orange;}"
            + "#script-table td {width: auto; padding: 2px 5px; text-align:center;}"
            + "#script-table thead tr td:nth-child(3) {width: 120px; display: block;}"
            //+ ".total-rating-count {display: inline-block; min-width: 1em; text-align: center; padding: 0px 0.25em; border-radius: 10px;}"
            + ".total-rating-count, .good-rating-count, .ok-rating-count, .bad-rating-count {display: inline-block; min-width: 1em; padding: 1px 3px; border-radius: 3px;}"
            + ".total-rating-count {background-color: rgba(0, 0, 255, 0.1);}"
            + "#script-table tbody td {background-color: #FFFBDB;}"
            + "#script-table tbody td:first-child{background-color: #F9D5A6;}"
            + "#script-table tbody td:nth-child(2){width: 99%; background-color: white;text-align:left;}"
            + "#script-table tbody tr:hover td {background-color: yellow;}"
            + ".currentSort {background-color: yellow !important;}"
            + ".loadingSort {background-color: #FDFDC3 !important;}"
            + ".type-library, .type-unlisted, .type-deleted, .filterL, .filterD, .filterU {font-size:smaller; display: inline-block; border-radius: 3px; padding: 0 5px; border: 1px solid black;}"
            + ".type-library, .type-unlisted, .type-deleted {box-shadow: 2px 2px 1px #888888; margin: 2px 5px 3px 0;}"
            + ".type-library, .filterL {background-color: #CEFD8A;}"
            + ".type-deleted, .filterD {background-color: #F77A7A;}"
            + ".type-unlisted, .filterU {background-color: #CEE7F3;}"
            + ".type-library:before {content: 'Library';}"
            + ".type-deleted:before {content: 'Deleted';}"
            + ".type-unlisted:before {content: 'Unlisted';}"
            + ".filterL, .filterD, .filterU {float: left; margin: 2px 3px 0 0; padding: 0 15px;}"
            + ".filterL:hover, .filterD:hover, .filterU:hover {cursor: default;}"
            + "#notice {margin:5px 5px 0 5px; background-color: #FDBB45;padding: 3px 5px; color: blue;}"
            + "#notice .filterD { background-color: #C0BEBE; float: none; color: black;}"
            + "thetitle {margin-bottom: 3px;} .theauthor{font-size:small;}"
        );
    }

    /* Populate the table with scripts
    ---------------------------------------------------------------------------*/
    function populateScriptTable(clear)
    {
        TSL.addStyle("Al28dj21", ".thetitle a {margin-right: 2px !important;}");
        TSL.addStyle("Al28dj23", ".theversion {font-size: xsmall; margin-right: 4px;}");
        TSL.addStyle("Al28dj24", ".scriptL td:nth-child(2) {background-color: #DFF9C6 !important;}");
        TSL.addStyle("Al28dj26", "tr[depreciated='true'] td:nth-child(2) {background-color: #FBEDE1 !important;}");
        TSL.addStyle("Al28dj27", ".scriptD td:nth-child(2) {background-color: #F9E8E8 !important;}");

        var tbody = document.getElementById("script-table").getElementsByTagName("tbody")[0];
        if (clear) tbody.innerHTML = "";

        if (scripts.length == 0)
        {
            var row = tbody.insertRow(-1);
            cell = row.insertCell(-1);
            cell.setAttribute("style", "text-align:center; font-weight: bold; font-style: oblique;");
            cell.textContent = "No Scripts"
            cell.setAttribute("colspan", 7);
        }

        var separator = false;

        var offset = 1;
        var prefix = "";
        if (scripts.length > 0)
        {
            var page = document.URL.match(/[&\?]page=(\d+)/);
            if (page) page = page[1]; else page = 1;
            offset = 1 + +((page - 1) * 100);
            var maxnum = scripts.length + offset;
            prefix = prefix.lPad("0", maxnum.toString().length);
        }


        for (var i = 0; i < scripts.length; i++)
        {
            var script = getScriptHTML(i);
            if (script.deleted && !separator)
            {
                TSL.addStyle("", "#ToggleDisplayClick {border: 1px solid; background-color: #FBDDD2 !important; color: orangered; cursor: pointer; height: 15px; font-weight: 600;}");
                separator = true;
                row = tbody.insertRow(-1);
                cell = row.insertCell(-1);
                cell.id = "ToggleDisplayClick";
                cell.setAttribute("colspan", 7);
                cell.textContent = "Click to toggle deleted scripts display";
                cell.onclick = function (e) { document.querySelector("#script-table span.filterD").click(); };
            }

            row = tbody.insertRow(-1);
            row.id = "s" + script.id;
            cell = row.insertCell(-1);

            var num = i + offset;
            cell.textContent = (prefix + num).slice((-1 * prefix.length));

            cell = row.insertCell(-1);
            var el = document.createElement("div");
            el.className = "thetitle";
            el.innerHTML = "<a href='https://greasyfork.org/scripts/"
                            + script.id + "' style='margin-right: 10px;'><b>" + script.name + "</b></a>";
            if (script.type == "library")
            {
                el.innerHTML += '<span class="type-library" />';
                row.className += "scriptL ";
                row.setAttribute("library", "true");
            }
            else if (script.type == "unlisted")
            {
                el.innerHTML += '<span class="type-unlisted" />';
                row.className += "scriptU ";
                row.setAttribute("unlisted", "true");
            }
            if (script.deleted)
            {
                el.innerHTML += '<span class="type-deleted" />';
                row.className += "scriptD ";
                row.setAttribute("deleted", "true");
            }
            if (document.body.getAttribute("PageType") == "ListingPage")
            {
                el.innerHTML += '<span class="theauthor"><span>by </span><a href="https://greasyfork.org/users/' + script.authorID + '">' + script.author + '</a></span>';
            }
            cell.appendChild(el);



            el = document.createElement("div");
            el.textContent = script.description;
            cell.appendChild(el);
            cell = row.insertCell(-1);
            cell.innerHTML = script.ratings + '<span class="total-rating-count">' + script.rating + '</span>';
            cell.title = "Favoured plus Good Feedback, OK Feedback, Bad Feedback, Total Score (" + script.rating + ")";
            row.insertCell(-1).textContent = script.installsDaily;
            row.insertCell(-1).textContent = script.installsTotal;
            row.insertCell(-1).textContent = script.dateCreated;
            row.insertCell(-1).textContent = script.dateUpdated;
        }

        filterTable();

        function getScriptHTML(idx)
        {
            var properties = "name id author authorID description rating ratings installsDaily installsTotal dateCreated dateUpdated type deleted";
            return makeStruct(properties, scripts[idx]);
        }
    }


    /* Apply Table filter
    ---------------------------------------------------------------------------*/
    function filterTable()
    {
        var css = "";
        var btns = document.querySelectorAll("#script-table thead td span");
        for (var i = 0; i < btns.length; i++)
            if (btns[i].style.backgroundColor) css += btns[i].className.replace("filter", ".script") + ", ";

        if (css) TSL.addStyle("ScriptFilter", css.replace(/,\s$/, "") + "{display: none;}");
    }

    /*  Filter the script table
    ---------------------------------------------------------------------------*/
    function onFilterClick(e)
    {
        TSL.removeNode("ScriptFilter");
        e.stopImmediatePropagation();
        this.style.backgroundColor = (this.style.backgroundColor) ? null : "#C0BEBE";
        filterTable();
    }



    /*  Filter the script table
    ---------------------------------------------------------------------------*/
    function selectSortOrder(pageType)
    {
        var tag = GM_getValue(pageType, "updated");
        var m = document.URL.match(/[\?&]sort=(\w+)/);
        m = (m) ? m[1] : "";

        if (m != tag || (document.URL.indexOf("per_page=100") < 0)) document.querySelector(("td[tag='" + tag + "']")).click();
        else
        {
            document.querySelector(("td[tag='" + tag + "']")).setAttribute("class", "currentSort");
            getScriptVersionNumbers();
        }
    }

    /*  Table header is clicked, get the correct script sorting
    ---------------------------------------------------------------------------*/
    function onTableHeaderClick(e)
    {
        if (this.className || this.parentElement.getAttribute("busy")) return;
        this.parentElement.setAttribute("busy", true);
        this.className = "loadingSort";

        getScriptListing(this.getAttribute("tag"));
    }



    /*   Get script page
    ---------------------------------------------------------------------------*/
    function getScriptListing(tag)
    {
        var isListingPage = (document.body.getAttribute("PageType") == "ListingPage");

        if (isListingPage) url = document.URL.match(/https:\/\/greasyfork.org\/[\w-]+\/scripts(\/by-site\/[\w\.\-_]+|\/search)?/)[0] + "?per_page=100";
        else url = document.URL.replace(/\?.+/, "?");

        var m = document.URL.match(/[^=\?&]+=[^&]+/g);
        if (m)
            for (var i = 0; i < m.length; i++)
            {
                //if (!m[i].match(/^(per_page|sort)/) && !(firstPage && m[i].match(/^page/))) url += "&" + m[i];
                if (!m[i].match(/^(per_page|sort)/)) url += "&" + m[i];
            }

        if (tag) url += "&sort=" + tag;

        url = url.replace(/\?&/, "?");
        url = url.replace(/\?$/, "");
        if (url.indexOf("?") < 0) url = url.replace("&", "?");

        console.warn("getScriptListing IN: " + url)
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            timeout: 15000,
            headers: {
                "User-agent": navigator.userAgent,
                "Host": "greasyfork.org",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5"
            },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    var header = document.querySelector(("td[tag='" + tag + "']"));
                    GM_setValue(document.body.getAttribute("PageType"), tag);

                    //Highlight right column header
                    var els = document.querySelectorAll("#script-table thead td");
                    for (var i = 0; i < els.length; i++) els[i].removeAttribute("class");

                    header.className = "currentSort";

                    //stackoverflow.com/questions/19193335/change-the-url-in-browser-bar-without-reloading-page
                    window.history.pushState(null, "", xhr.finalUrl); //Change document URL

                    scripts = new Array();
                    //var doc = new DOMParser().parseFromString(xhr.responseText, 'text/xml');

                    var doc = document.implementation.createHTMLDocument('MPIV');
                    doc.documentElement.innerHTML = xhr.responseText;

                    TSL.removeNode(document.getElementsByClassName("pagination")[0]);

                    var pager = doc.getElementsByClassName("pagination")[0];

                    if (pager)
                    {
                        document.body.insertBefore(pager, document.getElementById("script-table").nextElementSibling);
                    }

                    getScripts(doc);
                    populateScriptTable(true);
                    getScriptVersionNumbers();
                }

                header.parentElement.removeAttribute("busy");
                console.warn("getScriptListing OUT: " + url);
            }
        });
    }

    function getScriptVersionNumbers()
    {
        var jsonURL = document.URL.replace(/(\?|$)/, ".json$1");
        console.log("JSON: " + jsonURL);

        //Get version number
        GM_xmlhttpRequest({
            url: jsonURL,
            method: "GET",
            timeout: 15000,
            headers: {
                "User-agent": navigator.userAgent,
                "Host": "greasyfork.org",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5"
            },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    var scripts = JSON.parse(xhr.responseText);
                    if (!Array.isArray(scripts)) scripts = scripts.scripts;
                    for (var i = 0; i < scripts.length; i++)
                    {
                        var script = scripts[i];
                        var el = document.querySelector("#s" + script.id + " .thetitle");
                        if (el)
                        {
                            var s = document.createElement("span");
                            s.className = "theversion";
                            s.innerHTML = "(<strong>" + script.version + "</strong>)";
                            if (script.version.match(/defunct|depreciated|obselete/i))
                                el.parentElement.parentElement.setAttribute("depreciated", "true");
                            el.insertBefore(s, el.firstElementChild.nextElementSibling);
                        }
                    }

                    sortScripts();
                }
            }
        });

        function sortScripts()
        {
            if (document.body.getAttribute("PageType") == "ListingPage") return;

            var els = document.querySelectorAll('tr[depreciated = "true"]');
            if (!els) return;

            var before = document.getElementById("ToggleDisplayClick");
            if (before) before = before.parentElement;

            var tbody = document.getElementById("script-table").getElementsByTagName("tbody")[0];

            document.createAttribute

            TSL.addStyle("", "#Depreciated{border: 1px solid; background-color: #FBC783 !important; color: orangered; height: 15px; font-weight: 600;}");
            var row = tbody.insertRow(-1),
                cell = row.insertCell(-1);

            cell.id = "Depreciated";
            cell.setAttribute("colspan", 7);
            cell.textContent = "Depreciated Scripts: No longer supported but on last update they were functioning";
            tbody.insertBefore(row, before);

            for (var i = 0; i < els.length; i++)
            {
                if (!TSL.hasClass(els[i], "scriptD")) tbody.insertBefore(els[i], before);
            }

            //Renumber the scripts
            els = tbody.querySelectorAll('tr[id^="s"] td:first-child');
            for (var i = 0; i < els.length; i++)
            {
                els[i].textContent = (i + 1).toString().lPad("0", els.length.toString().length);
            }
        }
    }

    function getScriptJSON(obj)
    {
        var properties = "bad_ratings code_updated_at code_url contribution_amount contribution_url created_at daily_installs description fan_score good_ratings id license locale name namespace ok_ratings redistributable support_url total_installs url version";
        return makeStruct(properties, obj);
    }

    function makeStruct(keys, obj)
    {
        if (!obj) obj = {};

        var names = keys.split(" ").sort();
        for (var i = 0; i < names.length; i++)
        {
            obj[names[i]] = obj[names[i]];
        }

        return obj;
    }
})();
