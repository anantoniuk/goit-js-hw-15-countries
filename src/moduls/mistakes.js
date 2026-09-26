import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.css";

export const mistake = () => {
  new Notify({
    status: "error",
    title: "Write more uniq",
    text: "hard to find many queries",
    effect: "fade",
    speed: 300,
    customClass: "",
    customIcon: "",
    showIcon: false,
    showCloseButton: false,
    autoclose: false,
    autotimeout: 3000,
    notificationsGap: null,
    notificationsPadding: null,
    type: "filled",
    position: "right top",
    customWrapper: "",
  });
};
