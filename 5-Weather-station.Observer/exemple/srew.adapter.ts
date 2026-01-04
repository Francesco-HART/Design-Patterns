export class UsbCable {
  public isPlugged = false;

  plugUsbIn(): void {
    this.isPlugged = true;
    console.log("USB cable plugged in");
  }
}

export class UsbPort {
  public portAvailable = true;
  plug(cable: UsbCable): void {
    if (this.portAvailable) {
      cable.plugUsbIn();
      this.portAvailable = false;
      console.log("USB port is now occupied");
    }
  }
}

const usbCable = new UsbCable();
const usbPort = new UsbPort();
usbPort.plug(usbCable);

// Now we add an adapter to connect a USB cable to a Screw port

class MicroUsbCable {
  public isPlugged = false;

  plugMicroUsbIn(): void {
    this.isPlugged = true;
    console.log("Micro USB cable plugged in");
  }
}

class MicroUsbToUsbAdapter extends UsbCable {
  private microUsbCable: MicroUsbCable;

  constructor(microUsbCable: MicroUsbCable) {
    super();
    this.microUsbCable = microUsbCable;
    this.microUsbCable.plugMicroUsbIn();
  }
}

// Micro USB cable can now be plugged into USB port via the adapter
const microUsbCable = new MicroUsbCable();
const adapter = new MicroUsbToUsbAdapter(microUsbCable);
usbPort.plug(adapter);
