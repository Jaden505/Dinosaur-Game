import asyncio
import websockets
import random

ls_options = [0, 1]


async def Answer(websocket, path):
    while True:
        data = await websocket.recv()
        print(data)

        # jump = random.choice(ls_options)
        jump = random.randint(0, 1)
        await websocket.send(str(jump))
        print(str(jump))



def run():
    start_server = websockets.serve(Answer, "localhost", 8765)

    print("Running")
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    print("We are done")