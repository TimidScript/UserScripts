// ==UserScript==
// @name            [TS] Youtube Filter
// @namespace       TimidScript
// @version         1.1.32
// @description     Filter out users and channels from search with GUI. Include Auto-Paging and ScreenShot Links.
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         *//www.youtube.*
// @exclude         *//www.youtube.*/embed/*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Youtube_Filter
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// @icon            data:image/bmp;base64,Qk1GJwAAAAAAADYAAAAoAAAAMgAAADIAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////////////////////////////////////////////////////v3///79///+/f///v3///79//////////////79///+/f///v3///79////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAA////////////////4uLp/62rs/+Li5v/hIKV/4SClf+EgpX/hIKV/399j/9/fY//f32P/399j/9/fY//eniF/3p4hf96eIX/eniF/3p4hf96eIX/eniF/3p4hf90dHr/dHR6/3R0ev96eIX/eniF/3p4hf96eIX/eniF/3p4hf96eIX/f32P/399j/9/fY//f32P/399j/9/fY//hIKV/4SClf+EgpX/hIKV/6Siqv/f3Nz//v7/////////////AAAAAAAAAAD//////////62rs/9RUXz/Pj5u/zU1Zv81NWb/NTVm/zExY/8xMWP/MTFj/y8vXv8vL1z/Ly9c/y8vXP8rK1X/KytV/ysrVf8rK1X/KytV/ysrVf8rK1X/JiZO/yYmTv8mJk7/JiZO/ysrVf8rK1X/KytV/ysrVf8rK1X/KytV/ysrVf8vL1z/Ly9c/y8vXP8vL1z/Ly9e/zExY/8xMWP/NTVm/zU1Zv81NWb/OTlr/0VFc/+Jhpr/+fj0//////////////////////+1tL7/RUVz/zMzZv8xMWP/Ly9e/y8vXv8vL17/Ly9c/y8vXP8vL1z/KytV/ysrVf8rK1X/KytV/ysrVf8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/ysrVf8rK1X/KytV/ysrVf8rK1X/Ly9c/y8vXP8vL17/Ly9e/y8vXv8xMWP/MTFj/z4+bv+Eg5v//v7/////////////+fj0/1FRfP81NWb/MTFj/zExY/8xMWP/Ly9e/y8vXv8vL17/LiuT/y0ouv8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8tKLr/LSt7/y8vXP8vL17/Ly9e/zExY/8xMWP/MzNm/0VFc//f3Nz////////////Cws7/Pj5u/zExY/8xMWP/MTFj/zExY/8vL17/Ly9e/y0ouv8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/LiuT/y8vXv8vL17/MTFj/zExY/8xMWP/Pj5u/6CdsP///////////6CdsP85OWv/MTFj/zExY/8xMWP/MTFj/zExY/8tKLr/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/LiuT/zExY/8xMWP/MTFj/zExY/85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MTFj/zExY/8xMWP/LiuT/yoi7P8qIuz/KiLs/yoi7P8qIuz/Ixrr/yMa6/8nH+z/KiLs/yoi7P8qIuz/Jx/s/x4V6/8jGuv/Jx/s/yMa6/8jGuv/KiLs/ycf7P8jGuv/Jx/s/yMa6/8eFev/Jx/s/yoi7P8qIuz/KiLs/yMa6/8eFev/HhXr/yMa6/8qIuz/KiLs/yoi7P8rJN7/LiuT/zExY/8xMWP/MTFj/zk5a/+Jhpr///////////+gnbD/OTlr/zMzZv8xMWP/MTFj/zExY/8qI83/KiLs/yoi7P8qIuz/KiLs/yoi7P9LRO//W1Xw/zoy7f8nH+z/KiLs/ycf7P86Mu3/c27z/2lk8v8zK+3/W1Xw/0tE7/8nH+z/QTru/1tV8P86Mu3/YVvx/3Nu8/9BOu7/Jx/s/yoi7P8jGuv/W1Xw/3Nu8/9zbvP/S0Tv/yMa6/8qIuz/KiLs/yoi7P8tKLr/MTFj/zExY/8zM2b/OTlr/4mGmv///////////6CdsP85OWv/MzNm/zMzZv8xMWP/MTFj/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/83L+v//////gHv0/x4V6/8qIuz/Jx/s/9DO+////////////83L+v//////0M77/xcP6v+bl/b//////8nI+v///////////83L+v8jGuv/HhXr/4B79P/////////////////y8v7/S0Tv/yMa6/8qIuz/KiLs/y0ouv8xMWP/MTFj/zMzZv85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MzNm/zExY/8xMWP/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9LRO/////////////y8v7////////////Ny/r/Fw/q/5uX9v///////////+zr/f//////+vr//0E67v8nH+z/3t38///////Qzvv/3t38//////+qp/j/HhXr/yoi7P8qIuz/LSi6/zExY/8zM2b/MzNm/zk5a/+Jhpr///////////+gnbD/OTlr/zMzZv8zM2b/MzNm/zExY/8rJN7/KiLs/yoi7P8qIuz/KiLs/yMa6//JyPr//////4B79P8eFev/Ixrr/1NM8P//////3t38/zMr7f+KhfT//////83L+v8XD+r/m5f2//////+5tfj/Jx/s/9XT/P//////aWTy/zMr7f/6+v//+vr//zoy7f9QSfD//////97d/P8nH+z/KiLs/yoi7P8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///////////6CdsP85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/8nI+v//////gHv0/x4V6/8jGuv/U0zw///////Ny/r/Fw/q/2Fb8f//////zcv6/xcP6v+bl/b//////4qF9P8QB+r/sa74//////94c/P/OjLt///////s6/3/KiLs/zoy7f/e3fz/v735/yoi7P8qIuz/KiLs/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9TTPD//////83L+v8XD+r/aWTy///////Ny/r/Fw/q/5uX9v//////ioX0/xAH6v+qp/j//////4B79P9BOu7//////+zr/f8qIuz/Ixrr/ycf7P8qIuz/KiLs/yoi7P8qIuz/LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///////////+gnbD/OTlr/zMzZv8zM2b/MzNm/zMzZv8rJN7/KiLs/yoi7P8qIuz/KiLs/yMa6//JyPr//////4B79P8eFev/Ixrr/1NM8P//////zcv6/xcP6v9pZPL//////83L+v8XD+r/m5f2//////+KhfT/EAfq/6qn+P//////ioX0/0E67v//////+vr//9XT/P/V0/z/1dP8/7+9+f8zK+3/Jx/s/yoi7P8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///////////6CdsP85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/8nI+v//////gHv0/x4V6/8jGuv/U0zw///////Ny/r/Fw/q/2lk8v//////zcv6/xcP6v+bl/b//////4qF9P8QB+r/qqf4//////+Ae/T/QTru///////+/v//8vL+//Ly/v//////7Ov9/zMr7f8nH+z/KiLs/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9TTPD//////83L+v8XD+r/aWTy///////Ny/r/Fw/q/5uX9v//////ioX0/xAH6v+qp/j//////3hz8/86Mu3//////+zr/f8zK+3/UEnw///////e3fz/KiLs/ycf7P8qIuz/LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///79//////+gnbD/OTlr/zMzZv8zM2b/MzNm/zMzZv8rJN7/KiLs/yoi7P8qIuz/KiLs/yMa6//JyPr//////4B79P8eFev/Ixrr/1NM8P//////zcv6/xcP6v9pZPL//////83L+v8XD+r/m5f2//////+5tfj/Fw/q/83L+v//////aWTy/zMr7f/+/v//7Ov9/yMa6/9LRO///////9XT/P8nH+z/KiLs/yoi7P8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///v3//////6Cdq/85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/8nI+v//////gHv0/x4V6/8jGuv/U0zw///////Ny/r/Fw/q/2lk8v//////zcv6/xcP6v+bl/b////////////V0/z//v7///7+//9LRO//KiLs/+zr/f//////sa74/8nI+v//////pKH3/x4V6/8qIuz/KiLs/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa///+/f//////oJ2r/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9TTPD//////9XT/P8XD+r/aWTy///////Qzvv/Fw/q/5uX9v//////7Ov9////////////3t38/ycf7P8eFev/pKH3//////////////////r6//9QSfD/Ixrr/yoi7P8qIuz/LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///79//////+gnav/OTlr/zMzZv8zM2b/MzNm/zMzZv8rJN7/KiLs/yoi7P8nH+z/HhXr/xcP6v/JyPr//////3hz8/8QB+r/HhXr/zMr7f9bVfD/UEnw/ycf7P86Mu3/W1Xw/1BJ8P8eFev/m5f2//////+bl/b/aWTy/5OP9f9LRO//Jx/s/ycf7P8qIuz/YVvx/5OP9f+Tj/X/UEnw/yMa6/8zK+3/U0zw/zoy7f8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///v3//////6Cdq/85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/Jx/s/0E67v+Ae/T/eHPz/97d/P//////sa74/3Nu8/9zbvP/KiLs/yMa6/8jGuv/KiLs/ycf7P8jGuv/Ixrr/x4V6/+bl/b//////5OP9f8QB+r/HhXr/yMa6/8qIuz/KiLs/yoi7P8jGuv/HhXr/xcP6v8jGuv/QTru/2Fb8f+Ae/T/QTru/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa///+/f//////oJ2r/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8eFev/c27z//////////////////////////////////Ly/v8zK+3/Jx/s/yoi7P8qIuz/KiLs/yoi7P8qIuz/HhXr/5uX9v//////m5f2/x4V6/8qIuz/KiLs/yoi7P8qIuz/KiLs/ycf7P8qIuz/OjLt/1tV8P94c/P/k4/1/7Gu+P9LRO//LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///79//////+gnav/OTlr/zMzZv8zM2b/MzNm/zMzZv8qI83/KiLs/x4V6/9zbvP/////////////////////////////////7Ov9/0E67v86Mu3/QTru/0E67v9BOu7/QTru/0E67v8zK+3/pKH3//////+koff/Myvt/zoy7f86Mu3/OjLt/zMr7f8qIuz/Myvt/1BJ8P9zbvP/ioX0/6Sh9/+5tfj/3t38/0tE7/8tKLr/MzNm/zMzZv8zM2b/OTlr/4mEk////v3//////6Cdq/85OWv/MzNm/zMzZv8zM2b/MzNm/y4rk/8qIuz/KiLs/zoy7f9bVfD/YVvx/2lk8v9pZPL/c27z/3Nu8/9zbvP/W1Xw/1tV8P9bVfD/W1Xw/1tV8P9bVfD/W1Xw/1tV8P9pZPL/gHv0/2lk8v9bVfD/W1Xw/1tV8P9bVfD/W1Xw/2lk8v+Ae/T/k4/1/6Sh9/+5tfj/zcv6/+zr/f+/vfn/KyTe/y4rk/8zM2b/MzNm/zMzZv85OWv/iYST///+/f//////oJ2r/zk5a/8zM2b/MzNm/zMzZv81NWb/RUVz/y0ouv9TTPD/W1Xw/1tV8P9hW/H/YVvx/2Fb8f9hW/H/W1Xw/1tV8P9hW/H/YVvx/2Fb8f9hW/H/YVvx/2Fb8f9hW/H/YVvx/2Fb8f9bVfD/YVvx/2Fb8f9hW/H/YVvx/3Nu8/+KhfT/pKH3/7m1+P/JyPr/3t38/+zr/f/6+v//0M77/1NM8P9BPpT/OTlr/zMzZv8zM2b/MzNm/zk5a/+JhJP///79//////+gnav/OTlr/zMzZv81NWb/UVF8/2pqj/9xcZP/dXWY/29rz/9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v94c/P/k4/1/6Sh9/+xrvj/v735/8nI+v/Ny/r/v735/4qF9P9pZPL/cnCu/3Fxk/9xcZP/Y2OK/0VFc/8zM2b/OTlr/4mEk////v3//////6Cdq/85OWv/MzNm/2Njiv98fJ7/dXWY/3V1mP91dZj/dXWY/3Jwrv9va8//bmrn/25q5/9uauf/bmrn/3Fs6/9xbOv/cWzr/25q5/9uauf/bmrn/25q5/9uauf/cWzr/3Fs6/9xbOv/bmrn/25q5/9uauf/cWzr/3Fs6/9xbOv/cWzr/3Fs6/9xbOv/bmrn/25q5/9uauf/b2vP/3V1mP91dZj/dXWY/3V1mP98fJ7/cXGT/zk5a/85OWv/iYST///+/f//////oJ2r/zk5a/85OWv/dXWY/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/Pj5u/zk5a/+JhJP///79//////+gnav/OTlr/zk5a/98fJ7/g4Oi/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov9WVlr/R0dL/15eZP+Dg6L/g4Oi/4ODov+Dg6L/ZmZ7/zw8Pv82NjX/PDw+/3Fxk/+Dg6L/g4Oi/2Zme/82NjX/NjY1/2Zme/9HR0v/T09R/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov9FRXP/OTlr/4mEk////v3//////6Cdq/85OWv/Pj5u/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/ykpJ/8WFhP/PDw+/4qKp/+Kiqf/ioqn/4SDm/8fHxz/FhYT/xYWE/8WFhP/KSkn/4qKp/+Kiqf/KSkn/xYWE/8WFhP/FhYT/xYWE/8fHxz/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/jY2q/1FRfP85OWv/iYST///+/f//////oJ2r/zk5a/8+Pm7/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/KSkn/xYWE/9HR0v/kZGt/5GRrf+Rka3/Xl5k/xYWE/8fHxz/VlZa/xYWE/8WFhP/eniF/5GRrf8fHxz/FhYT/ykpJ/8fHxz/FhYT/x8fHP+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Xl7H/UVF8/zk5a/+JhJP///79//////+gnav/OTlr/0VFc/+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf8pKSf/FhYT/0dHS/+Xl7H/l5ex/5eXsf9HR0v/FhYT/1ZWWv+Xl7H/QUFB/xYWE/9eXmT/l5ex/x8fHP8WFhP/hIOb/3R0ev8WFhP/Hx8c/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5+ft/9bW4T/OTlr/4mEk////v3//////6Cdq/85OWv/UVF8/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/zY2Nf8WFhP/T09R/5+ft/+fn7f/n5+3/zw8Pv8WFhP/aWlu/5+ft/9WVlr/FhYT/1ZWWv+fn7f/Hx8c/xYWE/+Rka3/hIKV/xYWE/8pKSf/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/paW8/2Njiv85OWv/iYST///+/f//////oJ2r/zk5a/9RUXz/qam9/6WlvP+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+lpbz/NjY1/xYWE/9PT1H/paW8/6WlvP+lpbz/NjY1/xYWE/9paW7/paW8/1ZWWv8WFhP/VlZa/6WlvP8fHxz/FhYT/5iYp/+Jhpr/FhYT/ykpJ/+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+rq8D/amqP/zk5a/+JhJP///79//////+gm6b/OTlr/1tbhP+yssX/q6vA/6urwP+rq8D/q6vA/6urwP+rq8D/q6vA/6urwP+rq8D/q6vA/6urwP82NjX/FhYT/1ZWWv+rq8D/q6vA/6urwP82NjX/FhYT/2lpbv+rq8D/VlZa/xYWE/9WVlr/qam9/x8fHP8WFhP/oJ2w/4uLm/8WFhP/KSkn/6mpvf+rq8D/q6vA/6urwP+rq8D/q6vA/6urwP+rq8D/q6vA/7Kyxf91dZj/OTlr/4mEk////v3//////6Cbpv85OWv/Y2OK/7m5yv+yssX/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/qam9/ykpJ/8WFhP/R0dL/7Kyxf+yssX/srLF/zw8Pv8WFhP/dHR6/7Kyxf9eXmT/FhYT/1ZWWv+yssX/Hx8c/xYWE/+mprL/lJSa/xYWE/8pKSf/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/ubnK/3x8nv85OWv/iYST///+/f//////oJum/zk5a/9jY4r/wsLO/7m5yv+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv+UlJr/FhYT/xYWE/8pKSf/srLF/7m5yv+5ucr/R0dL/xYWE/90dHr/ubnK/15eZP8WFhP/aWlu/7m5yv8fHxz/FhYT/6mpvf+YmKf/FhYT/ykpJ/+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv/Cws7/g4Oi/zk5a/+JhJP///79//////+gm6b/OTlr/3Fxk//ExNP/vr7O/76+zv++vs7/vr7O/76+zv++vs7/vr7O/76+zv++vs7/vr7O/3R0ev8WFhP/FhYT/xYWE/+MjJP/vr7O/76+zv9eXmT/FhYT/2lpbv++vs7/T09R/xYWE/+IhIv/vr7O/ykpJ/8WFhP/q6vA/52dpf8WFhP/KSkn/76+zv++vs7/vr7O/76+zv++vs7/vr7O/76+zv++vs7/vr7O/8TE0/+Njar/OTlr/4mEk////v3//////6Cbpv85OWv/fHye/83N2f/ExNP/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/NjY1/xYWE/82NjX/FhYT/09PUf/ExNP/xMTT/4yMk/8WFhP/KSkn/1ZWWv8fHxz/FhYT/62rs//Cws7/KSkn/xYWE/+1tL7/pKKq/xYWE/8pKSf/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/zc3Z/5eXsf85OWv/iISL///+/f//////oJum/zk5a/+Kiqf/1NTf/8rK1//Kytf/ysrX/8rK1//Kytf/ysrX/8rK1//Kytf/ysrX/52dpf8WFhP/KSkn/6Siqv8fHxz/Hx8c/7W0vv/Kytf/ysrX/15eZP8WFhP/FhYT/xYWE/90dHr/ysrX/8LCzv8pKSf/Hx8c/769xP+mprL/Hx8c/zY2Nf/Kytf/ysrX/8rK1//Kytf/ysrX/8rK1//Kytf/ysrX/8rK1//Pz9v/n5+3/zk5a/+IhIv///79//////+gm6b/OTlr/5GRrf/Y2OL/z8/b/8/P2//Pz9v/z8/b/8/P2//Pz9v/z8/b/8/P2//Pz9v/Xl5k/xYWE/9PT1H/z8/b/0FBQf8fHxz/eniF/8/P2//Pz9v/z8/b/52dpf+IhIv/pKKq/8/P2//Pz9v/zc3Z/769xP++vcT/zc3Z/8rK1/++vcT/vr3E/8/P2//Pz9v/z8/b/8/P2//Pz9v/z8/b/8/P2//Pz9v/z8/b/9fX4f+pqb3/OTlr/4iEi////v3//////6Cbpv85OWv/jY2q/9zc5f/U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/8rK1/8pKSf/FhYT/5SUmv/U1N//dHR6/xYWE/9BQUH/1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//3Nzl/6WlvP85OWv/iISL///+/f//////pKKq/zk5a/9qao//4uLp/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Pz9v/lJSa/x8fHP8fHxz/xMTT/9jY4v+UlJr/Hx8c/x8fHP+1tL7/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/i4un/jY2q/zk5a/+IhIv///79///////Szcj/RUVz/z4+bv/ExNP/4uLp/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/5SUmv9PT1H/Hx8c/0dHS//c3OX/3Nzl/8LCzv8pKSf/Hx8c/4iEi//c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/4uLp/9jY4v9RUXz/Pj5u/66mov////////////n49P9bW4T/OTlr/1tbhP/X1+H/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/rauz/4iEi/90dHr/lJSa/+Li6f/i4un/3Nzl/3p4hf90dHr/rauz/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/dXWY/zU1Zv9RUXz/6+XZ/////////////////9bLs/9RUXz/OTlr/1FRfP+Rka3/xMTT/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Kytf/n5+3/1tbhP81NWb/RUVz/66mov///////////wAAAAD//////////9bLs/9bW4T/RUVz/z4+bv85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/Pj5u/1FRfP+5r6L///79//////8AAAAAAAAAAAAAAAD///////////n49P/Szcj/pKKq/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cdq/++vcT/9PHq/////////////////wAAAAAAAAAAAAAAAAAAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAA==
// ==/UserScript==

/* Information
********************************************************************************************
Copyright © 2014 TimidScript, All Rights Reserved.
Script's Homepage:              Check homepages below

TimidScript's Homepage:         https://openuserjs.org/users/TimidScript
                                https://greasyfork.org/users/1455-timidscript
                                https://monkeyguts.com/author.php?un=timidscript

                                http://userscripts.org/users/TimidScript
                                http://userscripts-mirror.org/users/TimidScript


Known Issues:
 - Support for paged front page is not implemented as it seems to cause infinite loop
----------------------------------------------
    Version History
----------------------------------------------
1.1.32 (2015-06-20)
 - Remove link tag on mouse down
1.1.31 (2015-06-19)
 - Added tag "?timidscript_youtube" to screenshot links.
1.1.30 (2015-04-25)
 - Bug Fix: Make it compatible with "Youtube Center" as it changes some of the classes script queries.
1.1.29 (2015-04-06)
 - Bug Fix: Removed monitor of search result
 - Bug Fix: Search results checks item count before parsing.
1.1.28 (2015-04-04)
 - Bug Fix: Now able to pickup changes in main page and by extension search result page.
1.1.27 (2015-01-18)
 - Bug fixes to changes in youtube layout (front page and user channel)
 - Bug fix filter button added to the side of video panel
 - Added script setting to change the icon size. Search for "VYCS" to get to the Section
 - Changed the scroll functionality
 - Generic Library added
 - Show all video setting is now stored
1.0.26 (2015-01-04)
 - Bug fix to front page due to changes in youtube
1.0.25 (2014-12-11)
 - Delay to handle delayed video recommendations
1.0.24 (2014-08-29)
 - Added GM_update
1.0.23 (2014-08-19)
 - Cleaned up header for OUJS
1.0.22 (2014-07-16)
 - @exclude iframe embed videos
1.0.21 (2014-07-15)
 - Added image link to channel videos
 - Added necessary @grant header
 - Altered the CSS
 - Remove MutationObserver from most page types
1.0.20 (2014-07-03)
 - Bug Fix: Fixed issues caused by change in youtube layout
 - Added option to turn off auto-paging
 - Removed img.youtube include
1.0.19 (2014-06-14)
 - Scrollable FilterWindow
 - Use port 8080 for require on userscripts.org
1.0.18 (2014-06-07)
 - Bug fix on pager when spelling correction is applied
1.0.17 (2014-05-31)
 - Updated so main page includes "Recommended" in the filter
1.0.16 (2014-05-30)
 - Modified CSS and link text
1.0.15 (2014-05-25)
 - Moved options button beside upload button if it exists.
1.0.14 (2014-05-21)
 - Bug Fix: Not checking for maxresdefault.jpg.
1.0.13 (2014-05-20)
 - Video screenshot link now points to "hqdefault.jpg" by default.
 Checks if "maxresdefault.jpg" and re-links if necessary
1.0.12 (2014-05-17)
 - Added link to max res screenshot
1.0.11 (2014-05-09)
 - Made options button invisible unless you hover over top, right corner.
1.0.10 (2014-03-28)
 - Updated broken script due to changes in youtube
1.0.9 (2014-01-16)
 - Bug not getting page type when type changes.
1.0.8 (2014-01-01)
 - Option button alternates filter window display
1.0.7b (2013-12-21)
 - Removed redundant code
 - Highlights blocked users and options buttonQ
 - Button now is an Icon
 - Bug fixes due to changes in Youtube
 - Captures changes in URL
1.0.6
 - Added block button on all thumbnails
 - Information stored now only contains the name of the user-channel and nothing else
1.0.5
 - Main X button now also removes filter
1.0.4
 - Colours added
1.0.3 (2013-10-16)
 - Extended the filter to work on main page
1.0.2 (2013-08-25)
 - Bug Fix: Filter observer added
1.0.1 (2013-08-24)
 - Initial Release
********************************************************************************************/


/************** [VYCS] Variable you can set **************/
//CSS Style for video page. It uses smaller text and icon for the block button and image link
//GM_setValue("PageType2",".blockBox .blockBTN32 {width: 24px; height: 24px;} .blockBox a {font-size: 10px;}"
//                + "body #watch7-sidebar-contents {padding: 15px 0px 15px 5px !important;}"
//                + "#watch7-sidebar-contents .video-list-item.related-list-item {padding-right: 24px;}");

//CSS Style that limites the size of the search list width, if increased by "Youtube Center"
//GM_setValue("PageType1",".ytcenter-site-search .yt-card.clearfix{width: 700px !important;}");
/**************************************************/

if (window.self !== window.top) return;
console.info("Youtube Filter");
var intervalID;
var AutoPaging = GM_getValue("AutoPaging",true);
//0 Main Page; 1 Search Result; 2 Video Page; 3 Channel Video Page
var PageTYPE = null; //Video Page
var FilteredUsers = new Array();

//*****************
///
function IsMouseEventInClientArea(event, element)
{
    var rect = element.getBoundingClientRect();
    var minX = rect.left + element.clientLeft;

    var x = event.clientX;
    if (x < minX || x >= minX + element.clientWidth) return false;
    var minY = rect.top + element.clientTop;
    var y = event.clientY;
    if (y < minY || y >= minY + element.clientHeight) return false;
    return true;
}

function GetPageType()
{
    PageTYPE  = null;
    if (document.URL.match(/\.youtube\.[^\/]+\/?$/i)) PageTYPE  = 0; //Main Page
    else if (document.URL.match(/youtube\.[^\/]+\/result/gi)) PageTYPE  = 1; //Search Result
    else if (document.URL.match(/youtube\.[^\/]+\/watch/gi)) PageTYPE  = 2; //Video Page
    else if (document.URL.match(/youtube\.[^\/]+\/(user|channel)\/.+\/videos/gi)) PageTYPE  = 3; //User Channel
}

function GetUserData(link)
{
    var user = new Object();
    user.name = link.textContent;
    user.url = link.href.replace(/.+youtube\.[a-z]+/, "");

    return user;
}

function IsFilteredUser(user)
{
    var userFilters = GetFilters();
    for (var i = 0; i < userFilters.length; i++)
    {
        if (userFilters[i] == user) return true;
    }

    return false;
}

function BlockUser(e)
{
    e.stopImmediatePropagation();
    console.log(this);
    var user = this.title;

    if (!IsFilteredUser(user))
    {
        var filters = GetFilters();
        filters.push(user);
        GM_setValue("Filters", JSON.stringify(filters));
    }

    HideUnwantedUsers();
    if (document.getElementById("FilterWindow")) CreateFilterWindow();
    return false;
}


function CreateScreenshotLink(videoID)
{
    var ss = document.createElement("a");
    ss.textContent = "[SH]";
    ss.href = "https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg?timidscript_youtube";

    GM_xmlhttpRequest(
    {
        url: "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg",
        method: "HEAD",
        onload: function (response)
        {
            if (response.status == 200)
            {
                //var contentLength = parseInt(response.responseHeaders.replace(/(Content-Length: (\d+)|.*\r?)/gi, "$2"));
                ss.href = "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg?timidscript_youtube";
                ss.textContent = "[SM]";
            }
        }
    });

    ss.addEventListener("mousedown",RemoveLinkTag, true);
    ss.addEventListener("mouseup",AddLinkTag, false);

    return ss;
}

function AddLinkTag(e)
{
    var link = e.target;
    if (link.postfix)
        setTimeout( function(){link.href += link.postfix;}, 250);
}
function RemoveLinkTag(e)
{
    var s, m = this.href.match(/\?timidscript_[_a-z0-9]+/i);
    if (m)
    {
        this.postfix = m[0];
        this.href = this.href.replace(/\?timidscript_[_a-z0-9]+/i, "");
    }
}

function AddBlockButton(li)
{
    var btn = document.createElement("span");
    btn.className = "blockBTN32";

    if (PageTYPE == 1) btn.title = li.getElementsByClassName("g-hovercard")[0].textContent;
    else btn.title = li.getElementsByClassName("g-hovercard")[1].textContent;

    var span = document.createElement("span");

    if (PageTYPE == 2)
    {
        span.setAttribute("style","position:absolute; right:0px;");
        li.insertBefore(span, li.firstElementChild);
    }
    else
    {
        span.setAttribute("style","float:right;");
        li.firstElementChild.insertBefore(span, li.firstElementChild.firstElementChild);
    }

    btn.onclick = BlockUser;
    span.appendChild(btn);
    span.className = "blockBox";

    var href = li.getElementsByTagName("a")[0].href;
    if (href.indexOf("/watch?v=") > 0)
    {
        var ss = CreateScreenshotLink(href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));
        ss.setAttribute("style","display:block;text-align:center;");
        span.appendChild(ss);
    }
}

function NextPageURL()
{
    var pager = document.getElementsByClassName('yt-uix-pager')[0];
    if (!pager) return null;

    var nextpage = pager.getElementsByClassName("yt-uix-button-toggled")[0].nextElementSibling;
    if (!nextpage) return null;

    return nextpage.href;
}


function ScrollCheck()
{
    var pager = document.getElementsByClassName('yt-uix-pager')[0];
    var loc = pager.offsetTop + pager.offsetHeight - document.documentElement.offsetHeight;

    if (loc < document.documentElement.scrollTop)
    {
        clearInterval(intervalID);
        var url = NextPageURL();

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "document";
        xhr.onload = function (e)
        {
            var pager = document.getElementsByClassName('yt-uix-pager')[0];
            var doc = xhr.response;
            var pagerNew = doc.getElementsByClassName('yt-uix-pager')[0];
            pager.outerHTML = pagerNew.outerHTML;

            var result = document.getElementsByClassName("item-section")[0];
            var resultNew = doc.getElementsByClassName("item-section")[0];

            //Removes spell correction from result
            if (resultNew.getElementsByClassName("spell-correction")[0])
            {
                resultNew.removeChild(resultNew.getElementsByClassName("spell-correction")[0].parentElement);
            }
            var lis = resultNew.children;


            while (lis.length > 0)
            {
                var li = lis[0];
                result.appendChild(li);
                var imgs = li.getElementsByTagName("img");

                for (var i = 0; i < imgs.length; i++)
                {
                    var src = imgs[i].getAttribute("data-thumb");
                    if (src) imgs[i].src = src;
                }

                AddBlockButton(li);
            }

            HideUnwantedUsers();
            setTimeout(EnablePager, 1500);
        };
        xhr.send();
    }
}

function EnablePager()
{
    if (AutoPaging && NextPageURL()) intervalID = setInterval(ScrollCheck, 500);
    else clearInterval(intervalID);
}

function HideUnwantedUsers()
{
    FilteredUsers = new Array();

    if (PageTYPE == 0) //Main Page
    {
        //var items = document.getElementsByClassName("channels-content-item");
        var items = document.getElementsByClassName("yt-lockup-video");

        for(var i = 0; i < items.length; i++)
        {
            var thumbdata = items[i],
            user =  thumbdata.querySelector(".yt-uix-sessionlink.spf-link.g-hovercard").textContent,
            filtered = IsFilteredUser(user),
            notice = thumbdata.parentNode.querySelector(".banNotice");

            if (filtered && !notice)
            {
                FilteredUsers.push(user);
                TSL.addClass(thumbdata,"blockedVideoBG");

                notice = document.createElement("div");
                notice.className = "banNotice";
                notice.style.left = thumbdata.offsetLeft + "px";

                notice.style.height = thumbdata.clientHeight + "px";
                notice.style.width = thumbdata.clientWidth + "px";
                notice.setAttribute("name","YTF");

                var  txt = document.createElement("span");
                txt.textContent = user;
                txt.style.height = thumbdata.clientHeight + "px";
                txt.style.width = thumbdata.clientWidth + "px";
                notice.appendChild(txt);
                thumbdata.parentNode.insertBefore(notice, thumbdata);
            }
            else if (!filtered && notice)
            {
                TSL.removeClass(thumbdata,"blockedVideoBG");
                TSL.removeNode(notice);
            }
        }
    }
    else //Search Result & Video Page
    {
        var results, user;
        if (PageTYPE == 1) results = document.getElementsByClassName("item-section")[0].children;
        else results = document.getElementsByClassName("video-list-item");

        for (var i = 0; i < results.length; i++)
        {
            try
            {
                var vid = results[i];
                if (vid.getElementsByClassName("g-hovercard").length == 0) continue;
                if (PageTYPE == 1) user = vid.getElementsByClassName("g-hovercard")[0].textContent;
                else user = vid.getElementsByClassName("g-hovercard")[1].textContent;

                var filtered = IsFilteredUser(user);
                if (filtered)
                {
                    FilteredUsers.push(user);
                    TSL.addClass(vid,"blockedVideo");
                }
                else
                {
                    TSL.removeClass(vid,"blockedVideo");
                }
            }
            catch (e) { console.warn(e); }
        }
    }

    if (FilteredUsers.length > 0) TSL.addStyle("OptSelect","#OptionsButton, #OptionsButton2{background-color: #FBE8E5;} #OptionsButton:hover{background-color: #FBD5CF}");
    else TSL.removeNode("OptSelect");
}

function GetFilters()
{
    var filters = GM_getValue("Filters", null);
    if (!filters) return new Array();

    return JSON.parse(filters);
}


function ShowAllVideos()
{
    if (Boolean(GM_getValue("ShowAllVideos",false)))
    {
        TSL.removeNode("BlockVideos");
        TSL.addStyle("ShowAllVideos",".banNotice {display: none;}");
    }
    else
    {
        TSL.addStyle("BlockVideos",".blockedVideo {display:none;}");
        TSL.removeNode("ShowAllVideos");
    }
}

function CreateFilterWindow()
{
    var fwin = document.getElementById("FilterWindow");
    if (fwin) TSL.removeNode(fwin);

    var userFilters = GetFilters();

    fwin = document.createElement("span");
    var tbHolder = document.createElement("div");
    tbHolder.setAttribute("style","overflow-x:hidden; overflow-y:auto; max-height: 500px;");
    var table = document.createElement("table");
    table.style.maxHeight
    tbHolder.appendChild(table);
    fwin.appendChild(tbHolder);


    for (var i = 0; i < userFilters.length; i++)
    {
        var user = userFilters[i];
        var btn = document.createElement("a");
        btn.className = "unblockBTN";
        btn.title = user;

        btn.onclick = function (e)
        {
            e.stopImmediatePropagation();
            var user = this.title;
            var filters = GetFilters();

            for(var i = 0;  i < filters.length; i++)
            {
                if (filters[i] == user)
                {
                    filters.splice(i,1);
                    GM_setValue("Filters", JSON.stringify(filters));
                    break;
                }
            }

            TSL.removeNode(this.parentElement.parentElement);
            HideUnwantedUsers();
        };

        var r = table.insertRow(-1);
        var td = document.createElement("td");
        r.appendChild(td);
        td.appendChild(btn);

        var a = document.createElement("a");
        a.href = "results?search_query=" + user + "&sm=3";

        var d = document.createElement("div");
        d.textContent = user;

        for(var j = 0; j < FilteredUsers.length; j++)
        {
            if (user == FilteredUsers[j])
            {
                r.style.backgroundColor = "#FBE8E5";
                //d.style.color = "red";
                break;
            }
        }

        td = document.createElement("td");
        a.appendChild(d);
        td.appendChild(a);
        r.appendChild(td);
    }


    var d = document.createElement("div");
    d.style.textAlign = "center";
    var b = document.createElement("input");

    if (PageTYPE == 1)
    {
        b.type = "button";
        b.value = "Auto-Page";
        b.style.backgroundColor = (AutoPaging) ? "lime" : "gray";
        b.onclick = function ()
        {
            AutoPaging = !AutoPaging;
            this.style.backgroundColor = (AutoPaging) ? "lime" : "gray";
            EnablePager();

            GM_setValue("AutoPaging",AutoPaging);
        };
        d.appendChild(b);
    }

    b = document.createElement("input");
    b.type = "button";
    b.value = "Show All";
    b.style.backgroundColor = Boolean(GM_getValue("ShowAllVideos",false)) ? "lime" : "gray";
    b.onclick = function ()
    {
        var show = !Boolean(GM_getValue("ShowAllVideos",false));
        this.style.backgroundColor = show ? "lime" : "gray";
        GM_setValue("ShowAllVideos", show);
        ShowAllVideos(show);
    };
    d.appendChild(b);

    b = document.createElement("input");
    b.type = "button";
    b.value = "Close";
    b.onclick = function () { TSL.removeNode("FilterWindow");};

    d.appendChild(b);
    fwin.appendChild(d);



    fwin.id = "FilterWindow";
    document.body.appendChild(fwin);
    return fwin;
}


var SearchCount = 0;
function AdjustSearchResult()
{
    var results;
    if (PageTYPE == 1) results = document.getElementsByClassName("item-section")[0].children;
    else results = document.getElementsByClassName("video-list-item");

    if (SearchCount == results.length) return;
    SearchCount = results.length;

    for (var i = 0; i < results.length; i++)
    {
        if (results[i].getElementsByClassName("blockBTN32").length == 0)
        {
            try
            {
                AddBlockButton(results[i]);
            }
            catch(e){};
        }
    }

    HideUnwantedUsers();
    if (PageTYPE == 1) EnablePager();
}

function AddOptions()
{
    if (document.getElementById("OptionsButton")) return;
    var masthead = document.getElementById("yt-masthead-signin");

    if (masthead)
    {
        var options = document.createElement("button");
        options.id = "OptionsButton";
        options.className = "yt-uix-button yt-uix-button-default";
        //options.textContent = "Options";
        options.onclick = function ()
        {
            var fwin = document.getElementById("FilterWindow");
            if (fwin) TSL.removeNode(fwin);
            else CreateFilterWindow();
        };
        masthead.insertBefore(options, masthead.firstElementChild);
    }
    else
    {
        var placer = document.createElement("div");
        placer.id = "FloatArea";
        document.body.appendChild(placer);


        var options = document.createElement("div");
        options.id = "OptionsButton";
        //options.textContent = "Options";
        options.onclick = function ()
        {
            var fwin = document.getElementById("FilterWindow");
            if (fwin) TSL.removeNode(fwin);
            else CreateFilterWindow();
        };

        document.onmousemove = function(e)
        {
            options.style.display = (IsMouseEventInClientArea(e,placer)) ? null : "none";
        }

        document.body.appendChild(options);
    }
}

//Mutation Observer
var MO =
{
    monitorBody: function()
    {
        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
        if (mo)
        {
            MO.Observer = new mo(
                function() {
                    setTimeout(MainFunc, 500);
                });

            MO.Observer.observe(document.body, { characterData:true, attributes: true, childList: true, subtree: true });
        }
    },

    disconnect: function()
    {
        if (MO.Observer) MO.Observer.disconnect();
        MO.Observer = null;
    }
};

var MainItemPageCount = 0;
function MainFunc()
{
    GetPageType();
    switch(PageTYPE)
    {
        case 0: //Main Page
            console.info("YTF: Main Page");
            MO.disconnect();
            AddOptions();

            var items = document.getElementsByClassName("yt-lockup");
            if (MainItemPageCount != items.length)
            {
                MainItemPageCount = items.length;
                for(var i = 0; i < items.length; i++)
                {
                    var thumbdata = items[i];
                    if (thumbdata.parsed) continue;
                    thumbdata.parsed = true;

                    var user = thumbdata.querySelector(".yt-uix-sessionlink.g-hovercard").textContent;
                    var filters = GetFilters();

                    var block = document.createElement("span");
                    block.className = "blockLINKS";

                    var blockBtn = document.createElement("a");
                    blockBtn.className = "blockBTN16";
                    blockBtn.title = user;
                    blockBtn.onclick = BlockUser;
                    block.appendChild(blockBtn);

                    var link = thumbdata.getElementsByTagName("a")[0];
                    link.appendChild(block);
                    link.className += " aaTT";

                    var ss = CreateScreenshotLink(link.href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));
                    block.appendChild(ss);
                }

                HideUnwantedUsers();
            }
            //setTimeout(MO.monitorBody, 1000);
            MO.monitorBody();
            break;
        case 1: //Search Result
            console.info("YTF: Search Result");
            //MO.disconnect();
            AddOptions();
            AdjustSearchResult();
            //MO.monitorBody();
            break;
        case 2: // Video Page
            //TSL.addStyle("YT_RELATED",".related-list-item .content-link {width:170px; background-color:red;}");
            console.info("YTF: Video Page");
            AddOptions();
            AdjustSearchResult();

            //Adds sceenshot
            var player = document.getElementById("watch7-headline");
            if (!player.getAttribute("screenshot"))
            {
                player.setAttribute("screenshot","added");
                var ss = CreateScreenshotLink(document.URL.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));
                player.insertBefore(ss, player.firstElementChild);
            }

            //Loads more side videos and filters them
            setTimeout(function()
            {
                if (document.getElementById("watch-more-related-button"))
                    document.getElementById("watch-more-related-button").click();
                setTimeout(function()
                {
                    AdjustSearchResult();
                }, 1000);

                //var player = document.getElementById("player");
            }, 2500);
            break;
        case 3: //User Channel
            console.info("YTF: User Channel");
            MO.disconnect();
            var vthumbs = document.getElementsByClassName("ux-thumb-wrap");

            for(var i = 0, thumb; i < vthumbs.length, thumb = vthumbs[i]; i++)
            {
                if (!thumb.className.match("aaTT"))
                {
                    thumb.className += " aaTT";

                    var block = document.createElement("span");
                    block.className = "blockLINKS";
                    block.style.visibility = "visible";
                    block.style.top = "10px";
                    thumb.appendChild(block);

                    var ss = CreateScreenshotLink(thumb.querySelector("a").href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));
                    ss.style.backgroundColor = "yellow";
                    ss.style.border = "1px solid black";
                    block.appendChild(ss);
                }
            }

            MO.monitorBody();
            break;
    }
}

var URL = document.URL;
(function ()
{
    GetPageType();
    if (PageTYPE == null) return;
    //Replace old saved syntax
    CURRENTVERSION = 1;
    if (GM_getValue("Version", 0) != CURRENTVERSION)
    {
        var filters = GM_getValue("Filters", null);

        if (filters)
        {
            filters = filters.split("|");
            for(var i = 0; i < filters.length; i++)
            {
                filters[i] = filters[i];
            }

            GM_setValue("Filters", JSON.stringify(filters));
        }

        GM_setValue("Version", CURRENTVERSION);
    }

    TSL.addStyle(null, "#OptionsButton {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADPUlEQVR42u3XX0xSURwH8N/lzwUVxED+mpW5HtQ0ptJspBPkKmVzTtfafKunntqa9d67bD219dZLPrVmc22mglhSul2FnEtfMjf/C4oCCpfLvw7XbGXxT5q98HuBO845389+nMs9YPCfC0t3oF6vl6DBpWwMk0Si0TMxDMtD17z4ZzGAIBaLBdhs9m4kEtkBFmvFYrHsnBig1WpxHo4TGIYRMplMU1Z2sVqpVAilUhkUigpBKBQCzsWBw+Ew48PhMNAhGnw+H3g9XnC6nLC5seH7trQ053I6yVgsNoKQZqvVSqcEXGtoIK6o1S86OjpK6uvrQSyWZNVit3sHpslpGBwcXJ2d/Xx3cmrKnBTQ3dX15WV/fyWO41kFHy+apqGnp2d+YGCgKingenv3fOmliorbTbWg0WhApSrJKnh9fQ1IkoRXY3ZYWVxYsA29rkwKaGzvtpKdz5r53g0Qr87AudAmVIsAzhfxQCaXg0gkOtwD+LE9QB/uAY/HA1tbW7C8G4S5bYBlUIC7uA5oXAJ1kw+GJ4bfGJMCDHq9/KBQZXHcNFVRBXJmi0MUgBUKAH/fBVzKC5zgPrDCNLAiYWZOFDgQZeEQ5gogxBUBxZeiaz4zLz4/b38VaqcekXzK1WoZG9tLCogXuuVkAaHSjBDVVIHi50JHmN9eU7xnwif/Hp4Q8AMhpYRKi93YhxDKEwHyfCj8U+LwpADm62hulvoLVWZ7m6mGEigzAjDhH3tJ3O9stY6P7yXKSPlLiPZEsb9APupo61MHBCVpAZhwW+rwtADx0ul0ElogN9sJ0yEiWdu9KHyidwaFG1KFpw1gOmEwSAJ8yYjdYKoNCM8mbvt7JpxA4bvprJs2IF4ter2YypeOOFr66vyC0j/bHg8/SD88Y8ARIpAvs5DG5+oQLmIAXMoDmtH7jgJq2zBqNrszWS9jQLwIg8E4d/Xx0OaFVgagWBqGsvEnN9CD5l2ma50IgLrQuKB5+GG9/BYDUH19CxUzT5vQvT6RA+QAOUAOkAOcFkC7Vt5uW6y5ByG86PQB6GzA5vF4LYFg6M5u8eVOdBoWy9Zspwf4tQiC4EbCYR3GYpHoD2na54B/Bsi2vgPc5hg/VHiJIwAAAABJRU5ErkJggg==); background-size:24px 24px; background-repeat:no-repeat; background-position:center;}");
    if (document.getElementById("yt-masthead-signin"))
    {
        TSL.addStyle("YTF_FW", "#FilterWindow{position: fixed;z-index: 9999999999999; right: 50px;top: 50px;background-color: #E9EAEA;border: 1px solid black;}#FilterWindow div{color: gray;text-decoration-style: none;padding: 3px 5px;}#FilterWindow tr:hover{text-decoration-style: none;background-color: lightgray;color: black;}");
        TSL.addStyle(null, "#OptionsButton {margin-right: 10px; height: 28px; width: 32px; background-size:15px 15px; background-repeat:no-repeat; background-position:center;}");
    }
    else
    {
        TSL.addStyle("YTF_FW", "#FilterWindow{position: fixed;z-index: 9999999999999; right: 10px;top: 95px;background-color: #E9EAEA;border: 1px solid black;}#FilterWindow div{color: gray;text-decoration-style: none;padding: 3px 5px;}#FilterWindow tr:hover{text-decoration-style: none;background-color: lightgray;color: black;}");
        TSL.addStyle(null, "#OptionsButton{height: 32px; width: 32px; margin: 0; padding: 0; position: fixed;color: #777979; right: 10px;top: 60px;border-radius: 3px;background-color: lightgray;border: 1px solid darkgray;cursor: pointer; z-index:99999999999999999;}#OptionsButton:hover{background-color: darkgray;color: black;}");
    }
    TSL.addStyle(null, ".blockBTN32, .blockBTN16, .unblockBTN{background-repeat:no-repeat; cursor:pointer; background-image: url(data:image/png;base64,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);background-size: contain;z-index: 100;}");
    TSL.addStyle("YTF_BT",".unblockBTN{display: inline-block;width: 16px;height: 16px; padding-right: 3px;} .blockBTN32{display: block;width: 32px;height: 32px;}a.aaTT:hover .blockLINKS{visibility: visible;} .blockBTN16 {display:block; background-color: black;border: 1px solid red;height: 24px;width: 24px;}");
    TSL.addStyle("YTF_BL", ".blockLINKS{position: absolute;top: 2px;visibility: hidden; z-index: 100; right: 2px;} .blockLINKS a:nth-child(2){line-height:normal; background-color:yellow; border: 1px solid blue; display:block;text-align:center;}");
    TSL.addStyle("YTF_NB", ".banNotice {position:absolute; z-index: 1000; font-size:medium;} .banNotice > span { display:table-cell; background-color:yellow; text-align: center; vertical-align: middle; }");
    TSL.addStyle("YTF_PC", "#FloatArea{position: fixed; right: 0px; top:10px; border: none; visibility:hidden; height: 200px; width:140px;}");
    TSL.addStyle("YTF_BX", ".blockBox {text-align:center;}");


    ShowAllVideos();
    TSL.addStyle("BlockVideoBG",".blockedVideo, .blockedVideoBG {background-color:#FBE8E5;}");


    if (PageTYPE == 2)
    {
        if (GM_getValue("PageType2",false))
            TSL.addStyle("",GM_getValue("PageType2"));
        else TSL.addStyle("","body #watch7-sidebar-contents {padding: 15px 0px 15px 5px !important;}"
                + "#watch7-sidebar-contents .video-list-item.related-list-item {padding-right: 35px;}");
    }
    else if (PageTYPE == 1 && GM_getValue("PageType1",false))
    {
        TSL.addStyle("",GM_getValue("PageType1"));
    }

    MainFunc();
})();

/*
1-3, Default is same as HQdefault but thumbnail size
http://img.youtube.com/vi/<insert-youtube-video-id-here>/<1-3>.jpg
http://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg

0 & HQ default are the same
http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
http://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg

http://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
https://developers.google.com/youtube/2.0/developers_guide_php?csw=1
*/
