(function () {
    var idxName = 0;
    var names = {};
    //load from query string if any
    const qprm = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (qprm.sym && qprm.sym.length > 0) {
      $("#txtNames").val(qprm.sym);
      //console.log(`Loaded from querystring ${qprm.sym}`);
    } //load from localstorage
    else {
      const storedNames = localStorage.getItem("watchlistTOS");
      // console.log(storedNames);
      if (storedNames && storedNames.length > 0) {
        $("#txtNames").val(storedNames);
      }
    }
    $("#btnNext").click(function (e) {
      //get symbols
      if ($.isEmptyObject(names)) {
        names = $("#txtNames").val().split(",");
      }
      //keep idxName for max limit
      let idxNameKeep = idxName;
      //load first
      $(".tv-chart").each(function (i, obj) {
        if (idxNameKeep < names.length) {
          setTimeout(() => {
            //delay seconds to reduce cpu load
            loadChart(names[idxName++], $(this)[0].id);
            $("#spnCnt").text(idxName + " / " + names.length);
          }, 1500 * i);
          idxNameKeep++;
        } //end of list
        else {
          $(this).empty(); //clear
          console.log("end of list");
        }
      });
      //$('html, body').scrollTop(0);
    });
    $("#btnPrev").click(function (e) {
      if (idxName >= $(".tv-chart").length * 2 ) {
        idxName = idxName - $(".tv-chart").length * 2;
        $(".tv-chart").each(function (i, obj) {
          if (idxName < names.length) {
            setTimeout(() => {
              //delay seconds to reduce cpu load
              loadChart(names[idxName++], $(this)[0].id);
            $("#spnCnt").text(idxName + " / " + names.length);
            }, 1000 * i);
          }
        });
      } else console.log("No previous ones");
    });
    $("#txtNames").change(function (e) {
      if ($("#txtNames").val().length >= 4) {
        //reset count
        idxName = 0;
        //reload list
        names = $("#txtNames").val().split(",");
        //save to localstorage
        localStorage.setItem("watchlistTOS", $("#txtNames").val());
      }
    });
    const loadChart = (symbol, container_id) => {
      new TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "Dark",
        style: "1",
        locale: "en", //"zh_TW",
        toolbar_bg: "rgba(0, 0, 0, 1)",
        hide_top_toolbar: true,
        left_toolbar: true,
        hide_side_toolbar: true, //drawing set
        allow_symbol_change: false,
        hideideas: true,
        show_popup_button: false, //not allow change symobl
        popup_width: "1000",
        popup_height: "650",
        container_id: container_id,
        studies: [
          { id: "MASimple@tv-basicstudies", inputs: { length: 200 } },
          { id: "MASimple@tv-basicstudies", inputs: { length: 21 } },
          { id: "MASimple@tv-basicstudies", inputs: { length: 50 } },
          //{ id: "MAExp@tv-basicstudies", inputs: { length: 21 } },
        ],
      });
    };
    //AUTO LOAD
    $("#btnNext").click();
  })();