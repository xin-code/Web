## 基本命令

查看所有分支：git branch

创建分支：git branch 分支名

切换分支：git checkout 分支名

创建分支并且换：git checkout -b 新分支名字

合并分支：①切换到主分支

​				   ②git merge 分支名

## git 撤销本地未push的commit记录

1. git log 查看当前分支的历史记录
2. 找到你想恢复到的ID，然后 git reset `*********`-----> 注意：不要加上 --hard ！
3. git log查看发现没有了commit记录，git status可以看到你的修改记录了

## github删除已经push到服务器上的commit的方法

git reset --hard <commit_id>

git push origin HEAD --force

其中commit_id是你想回到的commit的id（即想删除的commit的前一个commit），可以在github.com的commit中查看。

## github和gitee同时上传

git remote rm origin

然后，先关联GitHub的远程库：

git remote add github git@github.com:xxx/LearnGit.git

注意，远程库的名称叫github，不叫origin了。
接着，再关联码云的远程库：

git remote add gitee git@gitee.com:xxx/LearnGit.git

同样注意，远程库的名称叫gitee，不叫origin。
现在，我们用git remote -v查看远程库信息，可以看到两个远程库：

gitee   git@gitee.com:xxx/LearnGit.git (fetch)
gitee   git@gitee.com:xxx/LearnGit.git (push)
github  git@github.com:xxx/LearnGit.git (fetch)
github  git@github.com:xxx/LearnGit.git (push)
如果要推送到GitHub，使用命令：
git push github master
如果要推送到码云，使用命令：
git push gitee master
这样一来，本地库就可以同时与多个远程库互相同步

git remote修改对应远程库地址（远程仓库改名字）
1.列出远程库的名字
git remote 
2.查看远程库详细的url地址名和对应的别名
git remote -v
3.修改对应远程库地址
git remote set-url 别名 新地址

【Git】升级方法
输入git update-git-for-windows



## git不同模块上传代码



1. **首先查看是否是在提交代码的分支**  git status

   查看分支 git branch 

   切换分支 git checkout 分支名 

2. 然后进行git add .

   git commit -m 'XXXX' 提交的信息是存储在提交代码的分支上面

3. 合并到总分支

   - 切换到主分支 git checkout master
   - merge 合并分支 git merge login
   - 上传代码 git push gitee master
   - 上传代码 git push github master

4. 上传分支

   - 切换分支 git checkout login
     - 新建分支 需要-u
   - 上传代码 git push -u gitee 分支名
   - 上传代码 git push -u github 分支名
     - 修改代码提交
   - 上传代码 git push gitee 分支名
   - 上传代码 git push github 分支名

## 问题
-------------------------------------------------------------------------------------
问题一：(本地没有update到最新版本的项目)
! [rejected] master -> master (non-fast-forward)
error: failed to push some refs to 'git@github.com:xin-code/front_desk_of_website.git‘
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

解决：git pull --rebase
把git上最新的文件下载下来
再进行
git push gitee master
git push github master

