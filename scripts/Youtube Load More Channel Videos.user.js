// ==UserScript==
// @name            [TS] Youtube Load More Channel Videos
// @namespace       TimidScript
// @version         1.0.5b
// @description     Auto loads more videos in channel
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Read the License inside the script
// @include         http://www.youtube.*/user/*
// @include         https://www.youtube.*/user/*
// @include         http://www.youtube.*/channel/*
// @include         https://www.youtube.*/channel/*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Youtube_Load_More_Channel_Videos
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// @icon            data:image/bmp;base64,Qk1GJwAAAAAAADYAAAAoAAAAMgAAADIAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////////////////////////////////////////////////////v3///79///+/f///v3///79//////////////79///+/f///v3///79////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAA////////////////4uLp/62rs/+Li5v/hIKV/4SClf+EgpX/hIKV/399j/9/fY//f32P/399j/9/fY//eniF/3p4hf96eIX/eniF/3p4hf96eIX/eniF/3p4hf90dHr/dHR6/3R0ev96eIX/eniF/3p4hf96eIX/eniF/3p4hf96eIX/f32P/399j/9/fY//f32P/399j/9/fY//hIKV/4SClf+EgpX/hIKV/6Siqv/f3Nz//v7/////////////AAAAAAAAAAD//////////62rs/9RUXz/Pj5u/zU1Zv81NWb/NTVm/zExY/8xMWP/MTFj/y8vXv8vL1z/Ly9c/y8vXP8rK1X/KytV/ysrVf8rK1X/KytV/ysrVf8rK1X/JiZO/yYmTv8mJk7/JiZO/ysrVf8rK1X/KytV/ysrVf8rK1X/KytV/ysrVf8vL1z/Ly9c/y8vXP8vL1z/Ly9e/zExY/8xMWP/NTVm/zU1Zv81NWb/OTlr/0VFc/+Jhpr/+fj0//////////////////////+1tL7/RUVz/zMzZv8xMWP/Ly9e/y8vXv8vL17/Ly9c/y8vXP8vL1z/KytV/ysrVf8rK1X/KytV/ysrVf8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/yYmTv8mJk7/JiZO/ysrVf8rK1X/KytV/ysrVf8rK1X/Ly9c/y8vXP8vL17/Ly9e/y8vXv8xMWP/MTFj/z4+bv+Eg5v//v7/////////////+fj0/1FRfP81NWb/MTFj/zExY/8xMWP/Ly9e/y8vXv8vL17/LiuT/y0ouv8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8qI83/KiPN/yojzf8tKLr/LSt7/y8vXP8vL17/Ly9e/zExY/8xMWP/MzNm/0VFc//f3Nz////////////Cws7/Pj5u/zExY/8xMWP/MTFj/zExY/8vL17/Ly9e/y0ouv8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/LiuT/y8vXv8vL17/MTFj/zExY/8xMWP/Pj5u/6CdsP///////////6CdsP85OWv/MTFj/zExY/8xMWP/MTFj/zExY/8tKLr/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/KiLs/yoi7P8qIuz/LiuT/zExY/8xMWP/MTFj/zExY/85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MTFj/zExY/8xMWP/LiuT/yoi7P8qIuz/KiLs/yoi7P8qIuz/Ixrr/yMa6/8nH+z/KiLs/yoi7P8qIuz/Jx/s/x4V6/8jGuv/Jx/s/yMa6/8jGuv/KiLs/ycf7P8jGuv/Jx/s/yMa6/8eFev/Jx/s/yoi7P8qIuz/KiLs/yMa6/8eFev/HhXr/yMa6/8qIuz/KiLs/yoi7P8rJN7/LiuT/zExY/8xMWP/MTFj/zk5a/+Jhpr///////////+gnbD/OTlr/zMzZv8xMWP/MTFj/zExY/8qI83/KiLs/yoi7P8qIuz/KiLs/yoi7P9LRO//W1Xw/zoy7f8nH+z/KiLs/ycf7P86Mu3/c27z/2lk8v8zK+3/W1Xw/0tE7/8nH+z/QTru/1tV8P86Mu3/YVvx/3Nu8/9BOu7/Jx/s/yoi7P8jGuv/W1Xw/3Nu8/9zbvP/S0Tv/yMa6/8qIuz/KiLs/yoi7P8tKLr/MTFj/zExY/8zM2b/OTlr/4mGmv///////////6CdsP85OWv/MzNm/zMzZv8xMWP/MTFj/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/83L+v//////gHv0/x4V6/8qIuz/Jx/s/9DO+////////////83L+v//////0M77/xcP6v+bl/b//////8nI+v///////////83L+v8jGuv/HhXr/4B79P/////////////////y8v7/S0Tv/yMa6/8qIuz/KiLs/y0ouv8xMWP/MTFj/zMzZv85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MzNm/zExY/8xMWP/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9LRO/////////////y8v7////////////Ny/r/Fw/q/5uX9v///////////+zr/f//////+vr//0E67v8nH+z/3t38///////Qzvv/3t38//////+qp/j/HhXr/yoi7P8qIuz/LSi6/zExY/8zM2b/MzNm/zk5a/+Jhpr///////////+gnbD/OTlr/zMzZv8zM2b/MzNm/zExY/8rJN7/KiLs/yoi7P8qIuz/KiLs/yMa6//JyPr//////4B79P8eFev/Ixrr/1NM8P//////3t38/zMr7f+KhfT//////83L+v8XD+r/m5f2//////+5tfj/Jx/s/9XT/P//////aWTy/zMr7f/6+v//+vr//zoy7f9QSfD//////97d/P8nH+z/KiLs/yoi7P8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///////////6CdsP85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/8nI+v//////gHv0/x4V6/8jGuv/U0zw///////Ny/r/Fw/q/2Fb8f//////zcv6/xcP6v+bl/b//////4qF9P8QB+r/sa74//////94c/P/OjLt///////s6/3/KiLs/zoy7f/e3fz/v735/yoi7P8qIuz/KiLs/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9TTPD//////83L+v8XD+r/aWTy///////Ny/r/Fw/q/5uX9v//////ioX0/xAH6v+qp/j//////4B79P9BOu7//////+zr/f8qIuz/Ixrr/ycf7P8qIuz/KiLs/yoi7P8qIuz/LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///////////+gnbD/OTlr/zMzZv8zM2b/MzNm/zMzZv8rJN7/KiLs/yoi7P8qIuz/KiLs/yMa6//JyPr//////4B79P8eFev/Ixrr/1NM8P//////zcv6/xcP6v9pZPL//////83L+v8XD+r/m5f2//////+KhfT/EAfq/6qn+P//////ioX0/0E67v//////+vr//9XT/P/V0/z/1dP8/7+9+f8zK+3/Jx/s/yoi7P8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///////////6CdsP85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/8nI+v//////gHv0/x4V6/8jGuv/U0zw///////Ny/r/Fw/q/2lk8v//////zcv6/xcP6v+bl/b//////4qF9P8QB+r/qqf4//////+Ae/T/QTru///////+/v//8vL+//Ly/v//////7Ov9/zMr7f8nH+z/KiLs/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa////////////oJ2w/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9TTPD//////83L+v8XD+r/aWTy///////Ny/r/Fw/q/5uX9v//////ioX0/xAH6v+qp/j//////3hz8/86Mu3//////+zr/f8zK+3/UEnw///////e3fz/KiLs/ycf7P8qIuz/LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///79//////+gnbD/OTlr/zMzZv8zM2b/MzNm/zMzZv8rJN7/KiLs/yoi7P8qIuz/KiLs/yMa6//JyPr//////4B79P8eFev/Ixrr/1NM8P//////zcv6/xcP6v9pZPL//////83L+v8XD+r/m5f2//////+5tfj/Fw/q/83L+v//////aWTy/zMr7f/+/v//7Ov9/yMa6/9LRO///////9XT/P8nH+z/KiLs/yoi7P8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///v3//////6Cdq/85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/KiLs/yoi7P8qIuz/Ixrr/8nI+v//////gHv0/x4V6/8jGuv/U0zw///////Ny/r/Fw/q/2lk8v//////zcv6/xcP6v+bl/b////////////V0/z//v7///7+//9LRO//KiLs/+zr/f//////sa74/8nI+v//////pKH3/x4V6/8qIuz/KiLs/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa///+/f//////oJ2r/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8qIuz/KiLs/yoi7P8jGuv/ycj6//////+Ae/T/HhXr/yMa6/9TTPD//////9XT/P8XD+r/aWTy///////Qzvv/Fw/q/5uX9v//////7Ov9////////////3t38/ycf7P8eFev/pKH3//////////////////r6//9QSfD/Ixrr/yoi7P8qIuz/LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///79//////+gnav/OTlr/zMzZv8zM2b/MzNm/zMzZv8rJN7/KiLs/yoi7P8nH+z/HhXr/xcP6v/JyPr//////3hz8/8QB+r/HhXr/zMr7f9bVfD/UEnw/ycf7P86Mu3/W1Xw/1BJ8P8eFev/m5f2//////+bl/b/aWTy/5OP9f9LRO//Jx/s/ycf7P8qIuz/YVvx/5OP9f+Tj/X/UEnw/yMa6/8zK+3/U0zw/zoy7f8tKLr/MzNm/zMzZv8zM2b/OTlr/4mGmv///v3//////6Cdq/85OWv/MzNm/zMzZv8zM2b/MzNm/ysk3v8qIuz/Jx/s/0E67v+Ae/T/eHPz/97d/P//////sa74/3Nu8/9zbvP/KiLs/yMa6/8jGuv/KiLs/ycf7P8jGuv/Ixrr/x4V6/+bl/b//////5OP9f8QB+r/HhXr/yMa6/8qIuz/KiLs/yoi7P8jGuv/HhXr/xcP6v8jGuv/QTru/2Fb8f+Ae/T/QTru/y0ouv8zM2b/MzNm/zMzZv85OWv/iYaa///+/f//////oJ2r/zk5a/8zM2b/MzNm/zMzZv8zM2b/KyTe/yoi7P8eFev/c27z//////////////////////////////////Ly/v8zK+3/Jx/s/yoi7P8qIuz/KiLs/yoi7P8qIuz/HhXr/5uX9v//////m5f2/x4V6/8qIuz/KiLs/yoi7P8qIuz/KiLs/ycf7P8qIuz/OjLt/1tV8P94c/P/k4/1/7Gu+P9LRO//LSi6/zMzZv8zM2b/MzNm/zk5a/+Jhpr///79//////+gnav/OTlr/zMzZv8zM2b/MzNm/zMzZv8qI83/KiLs/x4V6/9zbvP/////////////////////////////////7Ov9/0E67v86Mu3/QTru/0E67v9BOu7/QTru/0E67v8zK+3/pKH3//////+koff/Myvt/zoy7f86Mu3/OjLt/zMr7f8qIuz/Myvt/1BJ8P9zbvP/ioX0/6Sh9/+5tfj/3t38/0tE7/8tKLr/MzNm/zMzZv8zM2b/OTlr/4mEk////v3//////6Cdq/85OWv/MzNm/zMzZv8zM2b/MzNm/y4rk/8qIuz/KiLs/zoy7f9bVfD/YVvx/2lk8v9pZPL/c27z/3Nu8/9zbvP/W1Xw/1tV8P9bVfD/W1Xw/1tV8P9bVfD/W1Xw/1tV8P9pZPL/gHv0/2lk8v9bVfD/W1Xw/1tV8P9bVfD/W1Xw/2lk8v+Ae/T/k4/1/6Sh9/+5tfj/zcv6/+zr/f+/vfn/KyTe/y4rk/8zM2b/MzNm/zMzZv85OWv/iYST///+/f//////oJ2r/zk5a/8zM2b/MzNm/zMzZv81NWb/RUVz/y0ouv9TTPD/W1Xw/1tV8P9hW/H/YVvx/2Fb8f9hW/H/W1Xw/1tV8P9hW/H/YVvx/2Fb8f9hW/H/YVvx/2Fb8f9hW/H/YVvx/2Fb8f9bVfD/YVvx/2Fb8f9hW/H/YVvx/3Nu8/+KhfT/pKH3/7m1+P/JyPr/3t38/+zr/f/6+v//0M77/1NM8P9BPpT/OTlr/zMzZv8zM2b/MzNm/zk5a/+JhJP///79//////+gnav/OTlr/zMzZv81NWb/UVF8/2pqj/9xcZP/dXWY/29rz/9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v9pZPL/aWTy/2lk8v94c/P/k4/1/6Sh9/+xrvj/v735/8nI+v/Ny/r/v735/4qF9P9pZPL/cnCu/3Fxk/9xcZP/Y2OK/0VFc/8zM2b/OTlr/4mEk////v3//////6Cdq/85OWv/MzNm/2Njiv98fJ7/dXWY/3V1mP91dZj/dXWY/3Jwrv9va8//bmrn/25q5/9uauf/bmrn/3Fs6/9xbOv/cWzr/25q5/9uauf/bmrn/25q5/9uauf/cWzr/3Fs6/9xbOv/bmrn/25q5/9uauf/cWzr/3Fs6/9xbOv/cWzr/3Fs6/9xbOv/bmrn/25q5/9uauf/b2vP/3V1mP91dZj/dXWY/3V1mP98fJ7/cXGT/zk5a/85OWv/iYST///+/f//////oJ2r/zk5a/85OWv/dXWY/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/fHye/3x8nv98fJ7/Pj5u/zk5a/+JhJP///79//////+gnav/OTlr/zk5a/98fJ7/g4Oi/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov9WVlr/R0dL/15eZP+Dg6L/g4Oi/4ODov+Dg6L/ZmZ7/zw8Pv82NjX/PDw+/3Fxk/+Dg6L/g4Oi/2Zme/82NjX/NjY1/2Zme/9HR0v/T09R/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov+Dg6L/g4Oi/4ODov9FRXP/OTlr/4mEk////v3//////6Cdq/85OWv/Pj5u/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/ykpJ/8WFhP/PDw+/4qKp/+Kiqf/ioqn/4SDm/8fHxz/FhYT/xYWE/8WFhP/KSkn/4qKp/+Kiqf/KSkn/xYWE/8WFhP/FhYT/xYWE/8fHxz/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/ioqn/4qKp/+Kiqf/jY2q/1FRfP85OWv/iYST///+/f//////oJ2r/zk5a/8+Pm7/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/KSkn/xYWE/9HR0v/kZGt/5GRrf+Rka3/Xl5k/xYWE/8fHxz/VlZa/xYWE/8WFhP/eniF/5GRrf8fHxz/FhYT/ykpJ/8fHxz/FhYT/x8fHP+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Rka3/kZGt/5GRrf+Xl7H/UVF8/zk5a/+JhJP///79//////+gnav/OTlr/0VFc/+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf8pKSf/FhYT/0dHS/+Xl7H/l5ex/5eXsf9HR0v/FhYT/1ZWWv+Xl7H/QUFB/xYWE/9eXmT/l5ex/x8fHP8WFhP/hIOb/3R0ev8WFhP/Hx8c/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5eXsf+Xl7H/l5ex/5+ft/9bW4T/OTlr/4mEk////v3//////6Cdq/85OWv/UVF8/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/zY2Nf8WFhP/T09R/5+ft/+fn7f/n5+3/zw8Pv8WFhP/aWlu/5+ft/9WVlr/FhYT/1ZWWv+fn7f/Hx8c/xYWE/+Rka3/hIKV/xYWE/8pKSf/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/n5+3/5+ft/+fn7f/paW8/2Njiv85OWv/iYST///+/f//////oJ2r/zk5a/9RUXz/qam9/6WlvP+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+lpbz/NjY1/xYWE/9PT1H/paW8/6WlvP+lpbz/NjY1/xYWE/9paW7/paW8/1ZWWv8WFhP/VlZa/6WlvP8fHxz/FhYT/5iYp/+Jhpr/FhYT/ykpJ/+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+lpbz/paW8/6WlvP+rq8D/amqP/zk5a/+JhJP///79//////+gm6b/OTlr/1tbhP+yssX/q6vA/6urwP+rq8D/q6vA/6urwP+rq8D/q6vA/6urwP+rq8D/q6vA/6urwP82NjX/FhYT/1ZWWv+rq8D/q6vA/6urwP82NjX/FhYT/2lpbv+rq8D/VlZa/xYWE/9WVlr/qam9/x8fHP8WFhP/oJ2w/4uLm/8WFhP/KSkn/6mpvf+rq8D/q6vA/6urwP+rq8D/q6vA/6urwP+rq8D/q6vA/7Kyxf91dZj/OTlr/4mEk////v3//////6Cbpv85OWv/Y2OK/7m5yv+yssX/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/qam9/ykpJ/8WFhP/R0dL/7Kyxf+yssX/srLF/zw8Pv8WFhP/dHR6/7Kyxf9eXmT/FhYT/1ZWWv+yssX/Hx8c/xYWE/+mprL/lJSa/xYWE/8pKSf/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/srLF/7Kyxf+yssX/ubnK/3x8nv85OWv/iYST///+/f//////oJum/zk5a/9jY4r/wsLO/7m5yv+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv+UlJr/FhYT/xYWE/8pKSf/srLF/7m5yv+5ucr/R0dL/xYWE/90dHr/ubnK/15eZP8WFhP/aWlu/7m5yv8fHxz/FhYT/6mpvf+YmKf/FhYT/ykpJ/+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv+5ucr/ubnK/7m5yv/Cws7/g4Oi/zk5a/+JhJP///79//////+gm6b/OTlr/3Fxk//ExNP/vr7O/76+zv++vs7/vr7O/76+zv++vs7/vr7O/76+zv++vs7/vr7O/3R0ev8WFhP/FhYT/xYWE/+MjJP/vr7O/76+zv9eXmT/FhYT/2lpbv++vs7/T09R/xYWE/+IhIv/vr7O/ykpJ/8WFhP/q6vA/52dpf8WFhP/KSkn/76+zv++vs7/vr7O/76+zv++vs7/vr7O/76+zv++vs7/vr7O/8TE0/+Njar/OTlr/4mEk////v3//////6Cbpv85OWv/fHye/83N2f/ExNP/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/NjY1/xYWE/82NjX/FhYT/09PUf/ExNP/xMTT/4yMk/8WFhP/KSkn/1ZWWv8fHxz/FhYT/62rs//Cws7/KSkn/xYWE/+1tL7/pKKq/xYWE/8pKSf/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/xMTT/8TE0//ExNP/zc3Z/5eXsf85OWv/iISL///+/f//////oJum/zk5a/+Kiqf/1NTf/8rK1//Kytf/ysrX/8rK1//Kytf/ysrX/8rK1//Kytf/ysrX/52dpf8WFhP/KSkn/6Siqv8fHxz/Hx8c/7W0vv/Kytf/ysrX/15eZP8WFhP/FhYT/xYWE/90dHr/ysrX/8LCzv8pKSf/Hx8c/769xP+mprL/Hx8c/zY2Nf/Kytf/ysrX/8rK1//Kytf/ysrX/8rK1//Kytf/ysrX/8rK1//Pz9v/n5+3/zk5a/+IhIv///79//////+gm6b/OTlr/5GRrf/Y2OL/z8/b/8/P2//Pz9v/z8/b/8/P2//Pz9v/z8/b/8/P2//Pz9v/Xl5k/xYWE/9PT1H/z8/b/0FBQf8fHxz/eniF/8/P2//Pz9v/z8/b/52dpf+IhIv/pKKq/8/P2//Pz9v/zc3Z/769xP++vcT/zc3Z/8rK1/++vcT/vr3E/8/P2//Pz9v/z8/b/8/P2//Pz9v/z8/b/8/P2//Pz9v/z8/b/9fX4f+pqb3/OTlr/4iEi////v3//////6Cbpv85OWv/jY2q/9zc5f/U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/8rK1/8pKSf/FhYT/5SUmv/U1N//dHR6/xYWE/9BQUH/1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//1NTf/9TU3//U1N//3Nzl/6WlvP85OWv/iISL///+/f//////pKKq/zk5a/9qao//4uLp/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Pz9v/lJSa/x8fHP8fHxz/xMTT/9jY4v+UlJr/Hx8c/x8fHP+1tL7/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/Y2OL/2Nji/9jY4v/i4un/jY2q/zk5a/+IhIv///79///////Szcj/RUVz/z4+bv/ExNP/4uLp/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/5SUmv9PT1H/Hx8c/0dHS//c3OX/3Nzl/8LCzv8pKSf/Hx8c/4iEi//c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/3Nzl/9zc5f/c3OX/4uLp/9jY4v9RUXz/Pj5u/66mov////////////n49P9bW4T/OTlr/1tbhP/X1+H/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/rauz/4iEi/90dHr/lJSa/+Li6f/i4un/3Nzl/3p4hf90dHr/rauz/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/4uLp/+Li6f/i4un/dXWY/zU1Zv9RUXz/6+XZ/////////////////9bLs/9RUXz/OTlr/1FRfP+Rka3/xMTT/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Nzdn/zc3Z/83N2f/Kytf/n5+3/1tbhP81NWb/RUVz/66mov///////////wAAAAD//////////9bLs/9bW4T/RUVz/z4+bv85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/OTlr/zk5a/85OWv/Pj5u/1FRfP+5r6L///79//////8AAAAAAAAAAAAAAAD///////////n49P/Szcj/pKKq/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cbpv+gm6b/oJum/6Cdq/++vcT/9PHq/////////////////wAAAAAAAAAAAAAAAAAAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAA==
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
**************************************************************************************************
    Version History
----------------------------------------------
1.0.5 (2015-06-27)
 - Using URI (base64) for script icon
1.0.4 (2014-08-29)
 - Added GM_update
1.0.3 (2014-08-19)
 - Cleaned up header for OUJS
1.0.2 (2013-12-14)
 - Included "/channel/"
1.0.1 (2013-07-08)
 - Initial Release

********************************************************************************************/


var scrollOffset = 1000;
var intervalID = setInterval(ScrollPosition, 250)

function ScrollPosition()
{
    if ((window.scrollMaxY - window.scrollY) < scrollOffset)
    {
        LoadMoreVideos();
    }
}

function LoadMoreVideos()
{
    var loadMore = document.getElementsByClassName("yt-uix-load-more load-more-button yt-uix-button yt-uix-button-default");
    if (loadMore.length == 0) loadMore = document.getElementsByClassName("more-videos yt-uix-button yt-uix-button-default");

    if (loadMore.length > 0)
    {
        loadMore = loadMore[0]
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        loadMore.dispatchEvent(evt);
    }
    else clearInterval(intervalID);
}
