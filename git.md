# git 撤销本地未push的commit记录

1. git log 查看当前分支的历史记录
2. 找到你想恢复到的ID，然后 git reset ID *------> 注意：不要加上 --hard ！！！ *
3. git log查看发现没有了commit记录，git status可以看到你的修改记录了