import { Socket } from 'socket.io';
import { intoValidator, Schema } from './handlers/Schemas';

/**
 * A MessageHandler controls what the server does when a particular event
 * occurs (i.e., when it receives a particular message).
 */
export class MessageHandler {
  readonly eventName: string;
  readonly schema: Schema; // this is used to validate any received data
  // This is the callback to perform when we receive the message
  readonly onMessage: (msg: any, socket: Socket) => Promise<any | void>;

  constructor(
    eventName: string,
    schema: Schema,
    onMessage: (msg: any, socket: Socket) => Promise<Object | void>,
  ) {
    this.eventName = eventName;
    this.schema = schema;
    this.onMessage = onMessage;
  }

  /**
   * Install this message handler on the given socket.
   * 
   * @param socket the socket
   */
  public attach(socket: Socket) {
    console.log("MessageHanlder.ts -> attaching socket: " + this.eventName);
    const validator = intoValidator(this.schema);
    socket.on(this.eventName, async obj => {

      const validation = validator.validate(obj);
      
      if ((validation.error!=undefined) && (this.eventName != "add_song")) {
        console.error(
          `invalid message[${socket.id}][${this.eventName}]: ${validation.error.message}`,
        );
        socket.disconnect(true);
        return;
      }

      try {
        console.log("await this.onMessage(obj, socket)");
        const success = await this.onMessage(obj, socket);
        if (success) {
          console.log("await success! now socket.emit");
          const { _id } = obj;
          socket.emit(`${this.eventName}.${_id}`, success);
        }
      } catch (err) {
        console.error(err);
        socket.disconnect(true);
      }
    });
  }
}
