import os

lessons_dir = "../public/lessons/"

master = open("master.md", "r")

lesson = 0
paragraph = 0

curr_lesson_dir = None
curr_p_file = None


def init_md_file(path):
    with open(path, "r+") as f:
        f.truncate(0)
    return


def set_new_lesson_dir(title):
    lesson_dir = f'{lessons_dir}/{lesson}/'
    if not os.path.exists(lesson_dir):
        os.makedirs(lesson_dir)

    p_file = f'{lesson_dir}0.md'
    init_md_file(p_file)
    return lesson_dir, p_file


for line in master:
    if line[:3] == "## ":
        lesson += 1
        curr_lesson_dir, curr_p_file = set_new_lesson_dir(lesson)
        paragraph = 0

    if line.strip() == '#':
        paragraph += 1
        curr_p_file = f'{curr_lesson_dir}{paragraph}.md'
        init_md_file(curr_p_file)
        continue

    with open(curr_p_file, "a+") as f:
        read_data = f.write(line)
