'''
python3 -m venv discord
discord/bin/pip3 install discord.py python-dotenv pyautogui
discord/bin/python3 bot.py

- https://freedium.cfd/https://medium.com/@neonforge/how-to-automate-midjourney-image-generation-with-python-and-gui-automation-ac9ca5f747ae
- https://pyautogui.readthedocs.io/en/latest/keyboard.html
- https://github.com/discordjs/discord.js
'''


import os
import time
import discord
from discord.ext import commands
from dotenv import load_dotenv
# import pygetwindow as gw
import pyautogui as pg

load_dotenv()
discord_token = os.getenv('DISCORD_TOKEN')

def load_prompts(file_path):
    with open(file_path, 'r') as file:
        return [line.strip().split(':') for line in file.readlines()]

prompts = load_prompts('prompts.txt')

client = commands.Bot(command_prefix="*", intents=discord.Intents.all())

@client.event
async def on_ready():
    print("Bot connected")
    # Only works on Windows :/
    # gw.getWindowsWithTitle('Discord')[0].activate()

@client.event
async def on_message(message):
    # Ignore messages from the bot itself
    if message.author == client.user:
        return

    if message.content.lower() == 'start':
        await handle_start()
    elif message.content.lower() in ('stop', 'quit'):
        await handle_stop()

async def handle_start():
    time.sleep(1)
    pg.press('tab')

    for command, prompt in prompts:
        pg.write(f'/{command}')
        time.sleep(3)
        pg.press('tab')
        pg.write(prompt)
        time.sleep(3)
        pg.press('enter')
        time.sleep(5)

async def handle_stop():
    print("Stopping automation.")
    await client.close()

client.run(discord_token)
